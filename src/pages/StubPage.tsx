import { ChevronLeft, Construction } from 'lucide-react';
import type { Route } from '@/hooks/useRouter';

interface StubPageProps {
  title: string;
  navigate: (r: Route) => void;
}

export function StubPage({ title, navigate }: StubPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      <button
        onClick={() => navigate({ name: 'landing' })}
        className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-800 mb-4 transition"
      >
        <ChevronLeft size={16} /> Meet
      </button>
      <div className="glass-card p-12 text-center">
        <Construction size={32} className="text-line mx-auto mb-3" />
        <h1 className="font-display text-2xl text-ink-900 mb-2">{title}</h1>
        <p className="text-ink-400 text-sm">
          This screen is part of the next build phase.
        </p>
      </div>
    </div>
  );
}
