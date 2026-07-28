import { useState } from 'react';
import { Search, X, Check, User, Users } from 'lucide-react';
import { useMeetData } from '@/hooks/useMeetData';
import { useFollow } from '@/context/FollowContext';

interface FollowPickerProps {
  open: boolean;
  onClose: () => void;
}

export function FollowPicker({ open, onClose }: FollowPickerProps) {
  const { allAthletes, allEvents } = useMeetData();
  const { followSwimmer, followTeam, isSwimmerFollowed, isTeamFollowed } = useFollow();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'swimmers' | 'teams'>('swimmers');

  if (!open) return null;

  const teams = Array.from(
    new Map(
      allAthletes.map((a) => [a.abbr, { abbr: a.abbr, name: a.team }])
    ).values()
  ).sort((a, b) => a.name.localeCompare(b.name));

  const filteredSwimmers = query
    ? allAthletes.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.displayName.toLowerCase().includes(q) ||
          a.lastName.toLowerCase().includes(q) ||
          a.team.toLowerCase().includes(q) ||
          a.abbr.toLowerCase().includes(q)
        );
      })
    : allAthletes;

  const filteredTeams = query
    ? teams.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.abbr.toLowerCase().includes(query.toLowerCase())
      )
    : teams;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink-950/40 backdrop-blur-sm pt-16 px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-card w-full max-w-2xl max-h-[75vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-display text-lg text-ink-900">FOLLOW</h2>
          <button
            onClick={onClose}
            className="text-ink-400 hover:text-ink-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-1 px-5 pt-3">
          <button
            onClick={() => setTab('swimmers')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-sm font-medium transition ${
              tab === 'swimmers'
                ? 'bg-green-100 text-green-800'
                : 'text-ink-500 hover:text-ink-800'
            }`}
          >
            <User size={14} /> Swimmers
          </button>
          <button
            onClick={() => setTab('teams')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg text-sm font-medium transition ${
              tab === 'teams'
                ? 'bg-green-100 text-green-800'
                : 'text-ink-500 hover:text-ink-800'
            }`}
          >
            <Users size={14} /> Teams
          </button>
        </div>

        <div className="px-5 py-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                tab === 'swimmers'
                  ? 'Search by name or team…'
                  : 'Search by team name…'
              }
              className="w-full bg-canvas border border-line rounded-lg pl-9 pr-3 py-2.5 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:border-green-500 transition"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3">
          {tab === 'swimmers' && (
            <div className="space-y-1">
              {filteredSwimmers.slice(0, 200).map((a) => {
                const followed = isSwimmerFollowed(a.uss);
                return (
                  <button
                    key={a.uss}
                    onClick={() =>
                      followed
                        ? null
                        : followSwimmer({
                            uss: a.uss,
                            name: a.displayName,
                            team: a.team,
                            abbr: a.abbr,
                          })
                    }
                    disabled={followed}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition ${
                      followed
                        ? 'bg-gold-100 text-gold-700'
                        : 'hover:bg-green-50 text-ink-800'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {a.displayName}
                      </div>
                      <div className="text-xs text-ink-400 truncate">
                        {a.age} yrs · {a.team}
                      </div>
                    </div>
                    {followed ? (
                      <Check size={16} className="text-gold-600 shrink-0" />
                    ) : (
                      <span className="text-xs text-ink-400 shrink-0">
                        Follow
                      </span>
                    )}
                  </button>
                );
              })}
              {filteredSwimmers.length === 0 && (
                <p className="text-center text-ink-400 text-sm py-8">
                  No swimmers found.
                </p>
              )}
            </div>
          )}

          {tab === 'teams' && (
            <div className="space-y-1">
              {filteredTeams.map((t) => {
                const followed = isTeamFollowed(t.abbr);
                return (
                  <button
                    key={t.abbr}
                    onClick={() =>
                      followed ? null : followTeam({ abbr: t.abbr, name: t.name })
                    }
                    disabled={followed}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition ${
                      followed
                        ? 'bg-green-100 text-green-800'
                        : 'hover:bg-green-50 text-ink-800'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {t.name}
                      </div>
                      <div className="text-xs text-ink-400">{t.abbr}</div>
                    </div>
                    {followed ? (
                      <Check size={16} className="text-green-600 shrink-0" />
                    ) : (
                      <span className="text-xs text-ink-400 shrink-0">
                        Follow
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-line text-xs text-ink-400">
          {allEvents.length} events · {allAthletes.length} athletes · Highlight
          follows across the entire meet
        </div>
      </div>
    </div>
  );
}
