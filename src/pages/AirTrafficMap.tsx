import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Plane, Navigation, Search, Filter, Info, Map as MapIcon, Layers, RefreshCw, AlertCircle, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

interface Flight {
  id: string;
  callsign: string;
  lat: number;
  lng: number;
  rotation: number;
  altitude: number;
  speed: number;
  origin: string;
  destination: string;
  onGround: boolean;
}

// Custom Plane Icon for Leaflet
const createPlaneIcon = (rotation: number, isSelected: boolean) => {
  return L.divIcon({
    html: `
      <div style="transform: rotate(${rotation}deg); transition: all 0.5s ease;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#FF0000' : '#00A4E4'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 2px rgba(0,0,0,0.5))">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5s-2.5 0-4 1.5L13.5 8.5l-8.2-1.8c-.9-.2-1.8.1-2.4.7l-.5.5c-.4.4-.5 1-.2 1.4l5.2 3.6-1.1 1.1-2.2-.4c-.5-.1-1 .1-1.4.5l-.5.5c-.4.4-.5 1-.2 1.4l1.1 1.1 1.1 1.1c.4.4 1 .3 1.4-.2l.5-.5c.4-.4.6-.9.5-1.4l-.4-2.2 1.1-1.1 3.6 5.2c.4.3 1 .2 1.4-.2l.5-.5c.7-.6 1-1.5.7-2.4z"></path>
        </svg>
      </div>
    `,
    className: 'custom-plane-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export function AirTrafficMap() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://opensky-network.org/api/states/all');
      if (!response.ok) throw new Error('Erreur lors de la récupération des données');
      
      const data = await response.json();
      const states = data.states || [];
      
      const afFlights: Flight[] = states
        .filter((s: any[]) => s[1] && s[1].trim().startsWith('AFR'))
        .map((s: any[]) => ({
          id: s[0],
          callsign: s[1].trim(),
          lng: s[5],
          lat: s[6],
          altitude: Math.round(s[7] * 3.28084) || 0,
          onGround: s[8],
          speed: Math.round(s[9] * 3.6) || 0,
          rotation: s[10] || 0,
          origin: 'N/A',
          destination: 'N/A'
        }))
        .filter((f: Flight) => f.lat !== null && f.lng !== null);

      setFlights(afFlights);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Flight fetch error:', err);
      setError('Impossible de charger les vols en direct. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredFlights = useMemo(() => {
    return flights.filter(f => f.callsign.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [flights, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-6 h-full flex flex-col"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-af-navy tracking-tight">Trafic Aérien en Temps Réel</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-af-text-muted">Suivi global de la flotte Air France en direct.</p>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">Live</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right mr-2 hidden md:block">
            <p className="text-[10px] text-af-text-muted uppercase font-bold">Dernière mise à jour</p>
            <p className="text-xs font-medium text-af-navy">{lastUpdate.toLocaleTimeString()}</p>
          </div>
          <button 
            onClick={fetchFlights}
            disabled={loading}
            className="p-2 bg-white border border-af-border rounded-lg hover:bg-af-bg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("w-4 h-4 text-af-navy", loading && "animate-spin")} />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-af-text-muted" />
            <input 
              type="text" 
              placeholder="Rechercher un vol..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-af-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-af-navy"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-[600px]">
        {/* Map View */}
        <Card className="lg:col-span-3 overflow-hidden relative border-af-border shadow-xl">
          <div className="w-full h-full z-0">
            <MapContainer 
              center={[20, 0]} 
              zoom={2} 
              style={{ height: '100%', width: '100%', background: '#051040' }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              
              {filteredFlights.map((f) => (
                <Marker 
                  key={f.id} 
                  position={[f.lat, f.lng]} 
                  icon={createPlaneIcon(f.rotation, selectedFlight?.id === f.id)}
                  eventHandlers={{
                    click: () => setSelectedFlight(f),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-2">
                      <p className="font-bold text-af-navy">{f.callsign}</p>
                      <p className="text-xs text-af-text-muted">{f.altitude.toLocaleString()} ft | {f.speed} km/h</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {loading && flights.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-af-navy/50 backdrop-blur-sm z-20">
              <div className="flex flex-col items-center gap-4">
                <RefreshCw className="w-10 h-10 text-white animate-spin" />
                <p className="text-white font-medium">Récupération des données OpenSky...</p>
              </div>
            </div>
          )}

          {/* Map Controls Overlay */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-af-navy/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] text-white font-medium">
              {filteredFlights.length} vols affichés
            </div>
          </div>
        </Card>

        {/* Flight Details Sidebar */}
        <div className="space-y-6">
          <Card className="h-full border-af-border shadow-xl">
            <CardHeader className="border-b border-af-border bg-af-bg/50">
              <CardTitle className="text-lg text-af-navy">Détails du Vol</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {selectedFlight ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-af-navy tracking-tight">{selectedFlight.callsign}</p>
                      <p className="text-xs text-af-text-muted font-medium">Appareil Air France</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-af-navy flex items-center justify-center shadow-lg shadow-af-navy/20">
                      <Plane className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-6 border-y border-af-border">
                    <div className="text-center">
                      <p className="text-xl font-bold text-af-navy">AFR</p>
                      <p className="text-[10px] text-af-text-muted uppercase tracking-widest font-bold">Compagnie</p>
                    </div>
                    <div className="flex-1 px-4 flex flex-col items-center">
                      <div className="w-full h-px bg-af-border relative">
                        <Navigation className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-af-red rotate-90" />
                      </div>
                      <p className="text-[10px] text-af-text-muted mt-2 font-medium">En transit</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-af-navy">LIVE</p>
                      <p className="text-[10px] text-af-text-muted uppercase tracking-widest font-bold">Statut</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-af-bg rounded-2xl border border-af-border/50">
                      <p className="text-[10px] text-af-text-muted uppercase font-bold mb-1">Altitude</p>
                      <p className="text-sm font-bold text-af-navy">{selectedFlight.altitude.toLocaleString()} ft</p>
                    </div>
                    <div className="p-4 bg-af-bg rounded-2xl border border-af-border/50">
                      <p className="text-[10px] text-af-text-muted uppercase font-bold mb-1">Vitesse</p>
                      <p className="text-sm font-bold text-af-navy">{selectedFlight.speed} km/h</p>
                    </div>
                    <div className="p-4 bg-af-bg rounded-2xl border border-af-border/50">
                      <p className="text-[10px] text-af-text-muted uppercase font-bold mb-1">Latitude</p>
                      <p className="text-sm font-bold text-af-navy">{selectedFlight.lat.toFixed(4)}</p>
                    </div>
                    <div className="p-4 bg-af-bg rounded-2xl border border-af-border/50">
                      <p className="text-[10px] text-af-text-muted uppercase font-bold mb-1">Longitude</p>
                      <p className="text-sm font-bold text-af-navy">{selectedFlight.lng.toFixed(4)}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Données Vérifiées</p>
                    </div>
                    <p className="text-[10px] text-emerald-600 font-medium">Position transmise via ADS-B en temps réel par le réseau OpenSky.</p>
                  </div>

                  <button className="w-full py-4 bg-af-navy text-white rounded-2xl font-bold text-sm hover:bg-af-navy-light transition-all shadow-xl shadow-af-navy/20 active:scale-[0.98]">
                    Ouvrir Fiche Vol Complète
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-80 text-center space-y-4 px-6">
                  <div className="w-20 h-20 rounded-full bg-af-bg flex items-center justify-center">
                    <Info className="w-10 h-10 text-af-text-muted" />
                  </div>
                  <div>
                    <p className="text-af-navy font-bold">Aucun vol sélectionné</p>
                    <p className="text-xs text-af-text-muted mt-2 leading-relaxed">Cliquez sur une icône d'avion sur la carte pour visualiser les paramètres de vol en direct.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
