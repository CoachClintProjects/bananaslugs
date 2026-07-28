import { useMemo, useState, useEffect } from 'react';
import { ChevronLeft, Waves, Star, Clock } from 'lucide-react';
import { useMeetData } from '@/hooks/useMeetData';
import { useFollow } from '@/context/FollowContext';
import type { Route } from '@/hooks/useRouter';
import type { MeetEvent, HeatEntry } from '@/types/meet';

interface HeatSheetsPageProps {
  navigate: (r: Route) => void;
  event?: string;
}

export function HeatSheetsPage({ navigate, event }: HeatSheetsPageProps) {
  const { allEvents } = useMeetData();
  const { swimmers, teams, isSwimmerFollowed, isTeamFollowed } = useFollow();
  const [selectedEventNum, setSelectedEventNum] = useState<number | null>(
    event ? parseInt(event, 10) : null
  );

  useEffect(() => {
    if (event) {
      const n = parseInt(event, 10);
      if (!isNaN(n)) setSelectedEventNum(n);
    }
  }, [event]);

  const selectedEvent = useMemo(
    () => allEvents.find((e) => e.eventNumber === selectedEventNum) || null,
    [allEvents, selectedEventNum]
  );

  const isEntryFollowed = (entry: HeatEntry) =>
    isSwimmerFollowed(entry.uss) || isTeamFollowed(entry.abbr);

  const hasFollowedInEvent = (ev: MeetEvent) =>
    ev.heats.some((h) => h.entries.some(isEntryFollowed));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      <button
        onClick={() => navigate({ name: 'landing' })}
        className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-800 mb-4 transition"
      >
        <ChevronLeft size={16} /> Meet
      </button>

      <div className="flex items-center gap-3 mb-6">
        <Waves size={24} className="text-green-700" />
        <h1 className="font-display text-2xl text-ink-900">Heat Sheets</h1>
      </div>

      {/* Event pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-3 mb-6">
        {allEvents.map((ev) => {
          const active = selectedEventNum === ev.eventNumber;
          const hasFollowed = hasFollowedInEvent(ev);
          return (
            <button
              key={ev.eventNumber}
              onClick={() => setSelectedEventNum(ev.eventNumber)}
              className={`shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                active
                  ? 'bg-green-700 text-white shadow-lg'
                  : 'bg-card border border-line text-ink-600 hover:border-green-400'
              }`}
            >
              {hasFollowed && (
                <Star size={12} className="text-gold-600" fill="currentColor" />
              )}
              <span className="text-xs text-ink-400">{ev.eventNumber}</span>
              <span className="hidden sm:inline">{ev.eventName}</span>
              <span className="sm:hidden">
                {ev.eventName.split(' ').slice(0, 3).join(' ')}
              </span>
            </button>
          );
        })}
      </div>

      {!selectedEvent ? (
        <div className="glass-card p-12 text-center">
          <Waves size={32} className="text-line mx-auto mb-3" />
          <p className="text-ink-400">
            Select an event to view its heat sheets.
          </p>
        </div>
      ) : (
        <EventHeatSheets
          event={selectedEvent}
          isEntryFollowed={isEntryFollowed}
          navigate={navigate}
        />
      )}
    </div>
  );
}

function EventHeatSheets({
  event,
  isEntryFollowed,
  navigate,
}: {
  event: MeetEvent;
  isEntryFollowed: (e: HeatEntry) => boolean;
  navigate: (r: Route) => void;
}) {
  const followedHeats = event.heats.filter((h) =>
    h.entries.some(isEntryFollowed)
  );
  const otherHeats = event.heats.filter(
    (h) => !h.entries.some(isEntryFollowed)
  );
  const orderedHeats = [...followedHeats, ...otherHeats];

  return (
    <div className="space-y-6">
      {/* Event header */}
      <div className="glass-card overflow-hidden">
        <div className="olympic-bar px-5 py-3">
          <div className="text-xs uppercase tracking-widest text-gold-400">
            Event {event.eventNumber}
          </div>
          <h2 className="font-display text-xl text-white mt-0.5">
            {event.eventName}
          </h2>
        </div>
        <div className="px-5 py-4 flex flex-wrap gap-4 text-sm text-ink-600">
          <span>{event.heats.length} heats</span>
          <span>·</span>
          <span>{event.totalEntries} entries</span>
          <span>·</span>
          <span>{event.teams.length} teams</span>
        </div>
        {event.standards.length > 0 && (
          <div className="px-5 pb-4 flex flex-wrap gap-2">
            {event.standards.map((s) => (
              <span
                key={s.label}
                className="event-chip bg-green-50 text-green-800 border border-green-200"
              >
                <span className="text-ink-400">{s.label}</span>
                <span className="font-mono text-gold-700">{s.time}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Heats */}
      {orderedHeats.map((heat, idx) => {
        const hasFollowed = heat.entries.some(isEntryFollowed);
        return (
          <div
            key={`${heat.heatNumber}-${idx}`}
            className={`glass-card overflow-hidden ${
              hasFollowed ? 'border-gold-400' : ''
            }`}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-line">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center text-sm font-bold text-green-800">
                  {heat.heatNumber}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-900">
                    {heat.heatLabel}
                  </div>
                  {heat.phase && (
                    <div className="text-xs text-ink-400">{heat.phase}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-ink-400">
                <Clock size={12} /> {heat.startTime}
              </div>
            </div>

            {/* Lane table */}
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-ink-400 border-b border-line">
                    <th className="text-left px-5 py-2 font-medium">Lane</th>
                    <th className="text-left px-3 py-2 font-medium">Swimmer</th>
                    <th className="text-left px-3 py-2 font-medium hidden sm:table-cell">Age</th>
                    <th className="text-left px-3 py-2 font-medium">Team</th>
                    <th className="text-right px-5 py-2 font-medium">Seed</th>
                  </tr>
                </thead>
                <tbody>
                  {heat.entries.map((entry, i) => {
                    const followed = isEntryFollowed(entry);
                    return (
                      <tr
                        key={`${entry.uss}-${i}`}
                        className={`border-b border-line/60 transition ${
                          followed
                            ? 'bg-gold-100 border-l-4 border-l-gold-600'
                            : 'hover:bg-green-50/50'
                        }`}
                      >
                        <td className="px-5 py-2.5 font-mono text-ink-600">
                          {entry.lane}
                        </td>
                        <td className="px-3 py-2.5">
                          <button
                            onClick={() =>
                              navigate({ name: 'profile', uss: entry.uss })
                            }
                            className="flex items-center gap-1.5 text-left"
                          >
                            {followed && (
                              <Star
                                size={12}
                                className="text-gold-600 shrink-0"
                                fill="currentColor"
                              />
                            )}
                            <span
                              className={`${
                                followed
                                  ? 'text-gold-700 font-medium'
                                  : 'text-ink-800'
                              } hover:underline`}
                            >
                              {entry.displayName}
                            </span>
                          </button>
                        </td>
                        <td className="px-3 py-2.5 text-ink-500 hidden sm:table-cell">
                          {entry.age}
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-xs text-ink-500">
                            {entry.abbr}
                          </span>
                        </td>
                        <td className="px-5 py-2.5 text-right font-mono text-ink-700">
                          {entry.seed}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
