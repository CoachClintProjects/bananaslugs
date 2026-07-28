import { createContext, useContext, type ReactNode } from 'react';
import { useFollowState } from '@/hooks/useFollowState';

type FollowState = ReturnType<typeof useFollowState>;

const FollowContext = createContext<FollowState | null>(null);

export function FollowProvider({ children }: { children: ReactNode }) {
  const state = useFollowState();
  return (
    <FollowContext.Provider value={state}>{children}</FollowContext.Provider>
  );
}

export function useFollow() {
  const ctx = useContext(FollowContext);
  if (!ctx) throw new Error('useFollow must be used within FollowProvider');
  return ctx;
}
