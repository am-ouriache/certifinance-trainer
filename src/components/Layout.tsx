import type { ReactNode } from 'react';
import type { NavTab } from '../types';

interface NavItem {
  id: NavTab;
  label: string;
  shortLabel: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', shortLabel: 'Dashboard', icon: '⊞' },
  { id: 'cif-cgp', label: 'CIF / CGP', shortLabel: 'CIF/CGP', icon: '📋' },
  { id: 'amf', label: 'AMF', shortLabel: 'AMF', icon: '🏛️' },
  { id: 'iobsp-niveau-1', label: 'IOBSP Niveau 1', shortLabel: 'IOBSP', icon: '🏦' },
  { id: 'ias-niveau-1', label: 'IAS Niveau 1', shortLabel: 'IAS', icon: '🛡️' },
  { id: 'add-content', label: 'Ajouter du contenu', shortLabel: 'Ajouter', icon: '＋' },
];

interface LayoutProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  children: ReactNode;
}

export default function Layout({ activeTab, onTabChange, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => onTabChange('dashboard')}
              className="flex items-center gap-2 text-slate-800 hover:text-blue-600 transition-colors"
            >
              <span className="text-xl">📊</span>
              <span className="font-semibold text-sm sm:text-base hidden xs:block">
                CertiFinance<span className="text-blue-600"> Trainer</span>
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile: show active section name */}
            <span className="lg:hidden text-sm font-medium text-slate-600">
              {NAV_ITEMS.find((i) => i.id === activeTab)?.label}
            </span>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40">
        <div className="grid grid-cols-6 h-16">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${
                activeTab === item.id ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="truncate w-full text-center px-0.5">{item.shortLabel}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 pb-24 lg:pb-8">
        {children}
      </main>
    </div>
  );
}
