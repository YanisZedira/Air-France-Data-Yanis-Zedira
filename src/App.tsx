import { useState, useEffect } from 'react';
import { Sidebar, PageId } from '@/src/components/layout/Sidebar';
import { Topbar } from '@/src/components/layout/Topbar';
import { Dashboard } from '@/src/pages/Dashboard';
import { Operations } from '@/src/pages/Operations';
import { Fleet } from '@/src/pages/Fleet';
import { Passengers } from '@/src/pages/Passengers';
import { Network } from '@/src/pages/Network';
import { Alerts } from '@/src/pages/Alerts';
import { Settings } from '@/src/pages/Settings';
import { AirTrafficMap } from '@/src/pages/AirTrafficMap';
import { Login } from '@/src/pages/Login';
import { Chatbot } from '@/src/components/dashboard/Chatbot';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('af_auth') === 'true';
  });
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('af_auth', isAuthenticated.toString());
  }, [isAuthenticated]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'operations': return <Operations />;
      case 'fleet': return <Fleet />;
      case 'passengers': return <Passengers />;
      case 'network': return <Network />;
      case 'traffic': return <AirTrafficMap />;
      case 'alerts': return <Alerts />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-af-bg font-sans text-af-text flex">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {renderPage()}
          
          <footer className="pt-8 pb-4 text-center text-sm text-af-text-muted border-t border-af-border mt-12">
            <p>Air France Analytics Platform &copy; 2026. Créé par Yanis Zedira (Data Analyst & Engineer).</p>
          </footer>
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
