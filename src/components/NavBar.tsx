import { Waves, Home, Clock, LayoutGrid, ListOrdered, Trophy } from 'lucide-react';
import type { Route } from '@/hooks/useRouter';

interface NavBarProps {
  route: Route;
  navigate: (r: Route) => void;
}

export function NavBar({ route, navigate }: NavBarProps) {
  const items = [
    { label: 'Meet', icon: Home, route: { name: 'landing' as const } },
    { label: 'Timeline', icon: Clock, route: { name: 'timeline' as const } },
    { label: 'Heat Sheets', icon: LayoutGrid, route: { name: 'heat-sheets' as const } },
    { label: 'Psych Sheets', icon: ListOrdered, route: { name: 'psych-sheets' as const } },
    { label: 'Results', icon: Trophy, route: { name: 'results' as const } },
  ];

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => navigate({ name: 'landing' })}
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-800 flex items-center justify-center">
            <Waves size={18} className="text-white" />
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <div className="font-display text-sm text-ink-900 tracking-wide">
              HPAC
            </div>
            <div className="text-[10px] text-ink-500 uppercase tracking-widest">
              Meet Suite
            </div>
          </div>
        </button>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {items.map((item) => {
            const active = route.name === item.route.name;
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.route)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'bg-green-100 text-green-800'
                    : 'text-ink-500 hover:text-ink-800 hover:bg-green-50'
                }`}
              >
                <Icon size={15} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
