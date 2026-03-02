import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { User, Bell, Shield, Database, Save } from 'lucide-react';

export function Settings() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-af-navy tracking-tight">Paramètres</h1>
          <p className="text-sm text-af-text-muted mt-1">Gérez vos préférences et la configuration de la plateforme.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-af-navy text-white rounded-lg text-sm font-medium hover:bg-af-navy-light transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          Enregistrer
        </button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-af-sky" />
              Profil Utilisateur
            </CardTitle>
            <CardDescription>Informations personnelles et rôle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-af-navy">Nom complet</label>
                <input type="text" defaultValue="Yanis Zedira" className="w-full px-3 py-2 border border-af-border rounded-lg focus:outline-none focus:ring-2 focus:ring-af-sky" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-af-navy">Email professionnel</label>
                <input type="email" defaultValue="yanis.zedira@airfrance.fr" className="w-full px-3 py-2 border border-af-border rounded-lg focus:outline-none focus:ring-2 focus:ring-af-sky" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-af-navy">Rôle</label>
                <input type="text" defaultValue="Data Analyst & Engineer" disabled className="w-full px-3 py-2 border border-af-border rounded-lg bg-gray-50 text-gray-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-af-navy">Département</label>
                <input type="text" defaultValue="IT & Data Operations" disabled className="w-full px-3 py-2 border border-af-border rounded-lg bg-gray-50 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-af-sky" />
              Notifications
            </CardTitle>
            <CardDescription>Gérez vos alertes et rapports automatisés.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: 'Alertes Opérationnelles Critiques', desc: 'Retards majeurs, annulations, incidents météo', checked: true },
              { title: 'Rapport Quotidien', desc: 'Résumé des performances envoyé à 08:00', checked: true },
              { title: 'Alertes Maintenance', desc: 'AOG et inspections urgentes', checked: false },
              { title: 'Nouveaux Utilisateurs', desc: 'Demandes d\'accès à la plateforme', checked: false },
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between p-4 border rounded-xl">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-af-navy">{item.title}</span>
                  <span className="text-xs text-af-text-muted">{item.desc}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-af-sky/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-af-sky"></div>
                </label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-af-sky" />
              Sources de Données
            </CardTitle>
            <CardDescription>État des connexions aux systèmes centraux.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Système de Réservation (Amadeus)', status: 'Connecté', lastSync: 'Il y a 2 min' },
                { name: 'Opérations Aériennes (Lido)', status: 'Connecté', lastSync: 'Temps réel' },
                { name: 'Maintenance (AMOS)', status: 'Connecté', lastSync: 'Il y a 15 min' },
                { name: 'CRM (Salesforce)', status: 'Synchronisation...', lastSync: 'En cours' },
              ].map((sys, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-b last:border-0">
                  <span className="text-sm font-medium text-af-navy">{sys.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-af-text-muted">{sys.lastSync}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${sys.status === 'Connecté' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {sys.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
