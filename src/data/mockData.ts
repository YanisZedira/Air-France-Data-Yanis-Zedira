export const revenueData = [
  { month: 'Jan', pax: 4.2, cargo: 1.1, total: 5.3 },
  { month: 'Fév', pax: 3.9, cargo: 1.0, total: 4.9 },
  { month: 'Mar', pax: 4.5, cargo: 1.2, total: 5.7 },
  { month: 'Avr', pax: 4.8, cargo: 1.1, total: 5.9 },
  { month: 'Mai', pax: 5.1, cargo: 1.3, total: 6.4 },
  { month: 'Juin', pax: 5.5, cargo: 1.2, total: 6.7 },
  { month: 'Juil', pax: 6.2, cargo: 1.4, total: 7.6 },
  { month: 'Août', pax: 6.5, cargo: 1.3, total: 7.8 },
  { month: 'Sep', pax: 5.2, cargo: 1.4, total: 6.6 },
  { month: 'Oct', pax: 4.9, cargo: 1.5, total: 6.4 },
  { month: 'Nov', pax: 4.3, cargo: 1.6, total: 5.9 },
  { month: 'Déc', pax: 5.0, cargo: 1.7, total: 6.7 },
];

export const onTimePerformance = [
  { name: "À l'heure", value: 82.4, color: '#00A4E4' },
  { name: 'Retard < 15m', value: 10.2, color: '#FCD34D' },
  { name: 'Retard > 15m', value: 5.1, color: '#F97316' },
  { name: 'Annulés', value: 2.3, color: '#FF0000' },
];

export const regionalPerformance = [
  { region: 'Europe', flights: 45200, revenue: 1200, loadFactor: 84 },
  { region: 'Am. Nord', flights: 12400, revenue: 2100, loadFactor: 89 },
  { region: 'Asie', flights: 8300, revenue: 1500, loadFactor: 81 },
  { region: 'Afrique', flights: 9100, revenue: 950, loadFactor: 78 },
  { region: 'Am. Sud', flights: 5200, revenue: 850, loadFactor: 86 },
];

export const fleetStatus = [
  { type: 'A350-900', active: 27, maintenance: 2, total: 29 },
  { type: 'B777-300ER', active: 41, maintenance: 2, total: 43 },
  { type: 'A330-200', active: 14, maintenance: 1, total: 15 },
  { type: 'A320', active: 38, maintenance: 3, total: 41 },
  { type: 'A220-300', active: 32, maintenance: 1, total: 33 },
];

export const recentAlerts = [
  { id: 1, type: 'weather', message: 'Alerte météo: Orages prévus sur CDG (14h-18h)', severity: 'high', time: '10:23' },
  { id: 2, type: 'maintenance', message: 'A350 (F-HTYA) - Inspection moteur requise', severity: 'medium', time: '09:45' },
  { id: 3, type: 'operational', message: 'Retard cumulé > 45m sur rotation AF1234', severity: 'medium', time: '08:12' },
  { id: 4, type: 'system', message: 'Mise à jour système de réservation terminée', severity: 'low', time: '04:00' },
];
