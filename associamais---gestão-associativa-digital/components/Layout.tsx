
import React from 'react';
import { Association, User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  association: Association;
  currentTab: string;
  setTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, association, currentTab, setTab }) => {
  const isAdmin = user.role === UserRole.ADMIN;
  const isSupport = user.role === UserRole.SUPPORT;

  const tabs = [
    { id: 'inicio', label: 'Início', icon: '🏠', allowed: true },
    { id: 'usuarios', label: 'Gestão', icon: '👥', allowed: isAdmin },
    { id: 'estatuto', label: 'Normas', icon: '📜', allowed: true },
    { id: 'pagamento', label: 'Finanças', icon: '💰', allowed: !isSupport },
    { id: 'cadastro', label: 'Perfil', icon: '👤', allowed: true },
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-slate-50 shadow-2xl relative border-x border-slate-200 overflow-hidden">
      <header 
        className="p-4 text-white flex items-center justify-between sticky top-0 z-50 shadow-lg"
        style={{ backgroundColor: association.brandColor }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold text-xl backdrop-blur-sm border border-white/10">
            {association.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-bold text-[11px] leading-tight uppercase tracking-wider truncate max-w-[180px]">{association.name}</h1>
            <p className="text-[9px] opacity-70 font-bold uppercase tracking-tighter">
              {isSupport ? 'Acesso Técnico' : user.role}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 pb-24 overflow-y-auto">
        {children}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-slate-200 flex justify-around p-3 z-50 rounded-t-[32px] shadow-2xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => tab.allowed && setTab(tab.id)}
            className={`flex flex-col items-center p-1 px-3 rounded-2xl transition-all duration-300 ${
              currentTab === tab.id 
                ? 'text-emerald-600 bg-emerald-50 scale-105' 
                : 'text-slate-400'
            } ${!tab.allowed ? 'hidden' : ''}`}
          >
            <span className="text-xl mb-0.5">{tab.icon}</span>
            <span className="text-[9px] font-bold uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
