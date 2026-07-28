import { useMemo, useState } from 'react';
import { MapPin, Calendar, Clock, Play, Star, ArrowRight, Radio, LayoutGrid, Trophy } from 'lucide-react';
import { useMeetData } from '@/hooks/useMeetData';
import { useFollow } from '@/context/FollowContext';
import type { Route } from '@/hooks/useRouter';
import type { MeetSession } from '@/types/meet';

interface LandingPageProps {
  navigate: (r: Route) => void;
}

export function LandingPage({ navigate }: LandingPageProps) {
  const { config, allEvents, allAthletes } = useMeetData();
  const { swimmers, teams } = useFollow();
  const [selectedSession, setSelectedSession] = useState<string>('all');

  const sessions = config.sessions;
  const totalHeats = useMemo(
    () => allEvents.reduce((sum, e) => sum + e.heats.length, 0),
    [allEvents]
  );

  const followedSwimmerEvents = useMemo(() => {
    if (swimmers.length === 0 && teams.length === 0) return [];
    const ussSet = new Set(swimmers.map((s) => s.uss));
    const teamSet = new Set(teams.map((t) => t.abbr));
    const results: { eventNumber: number; eventName: string; heatLabel: string; startTime: string; swimmerName: string }[] = [];
    for (const ev of allEvents) {
      for (const heat of ev.heats) {
        for (const entry of heat.entries) {
          if (ussSet.has(entry.uss) || teamSet.has(entry.abbr)) {
            results.push({
              eventNumber: ev.eventNumber,
              eventName: ev.eventName,
              heatLabel: heat.heatLabel,
              startTime: heat.startTime,
              swimmerName: entry.displayName,
            });
          }
        }
      }
    }
    return results.sort((a, b) => a.eventNumber - b.eventNumber);
  }, [allEvents, swimmers, teams]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950 via-green-900 to-green-800" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(212,165,0,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(51,179,116,0.3) 0%, transparent 40%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="event-chip bg-gold-600/20 text-gold-300 border border-gold-600/40">
              <Radio size={12} /> Live Meet
            </div>
            <div className="event-chip bg-white/10 text-green-100 border border-white/20">
              {allEvents.length} Events · {totalHeats} Heats · {allAthletes.length} Athletes
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-white leading-tight mb-3">
            {config.meetName}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-green-100 mb-8">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gold-400" /> {config.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gold-400" /> {config.dates}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-gold-400" /> {config.host}
            </span>
          </div>

          {/* Session selector */}
          <div className="flex flex-wrap gap-2 mb-8">
            {sessions.map((s: MeetSession) => (
              <button
                key={s.key}
                onClick={() => setSelectedSession(s.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedSession === s.key
                    ? 'bg-gold-600 text-white shadow-lg'
                    : 'bg-white/10 text-green-100 hover:bg-white/20'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate({ name: 'heat-sheets' })}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-600 text-white font-semibold shadow-lg hover:bg-gold-700 transition"
            >
              <LayoutGrid size={18} /> View Heat Sheets
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate({ name: 'results' })}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition"
            >
              <Trophy size={18} /> Results
            </button>
            <button
              onClick={() => navigate({ name: 'timeline' })}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition"
            >
              <Clock size={18} /> Timeline
            </button>
          </div>
        </div>
      </section>

      {/* Live stream + followed swimmers */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid gap-6 lg:grid-cols-3">
        {/* Stream */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-line">
            <Play size={16} className="text-gold-600" />
            <span className="font-display text-sm uppercase tracking-wide text-ink-900">
              Live Stream
            </span>
          </div>
          <div className="aspect-video bg-ink-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-800 flex items-center justify-center mx-auto mb-3">
                <Play size={28} className="text-white ml-1" />
              </div>
              <p className="text-green-100 text-sm">
                Stream URL will appear here during the meet
              </p>
            </div>
          </div>
        </div>

        {/* Followed swimmers up next */}
        <div className="glass-card overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-line">
            <Star size={16} className="text-gold-600" />
            <span className="font-display text-sm uppercase tracking-wide text-ink-900">
              Your Swimmers
            </span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto scrollbar-thin max-h-80">
            {followedSwimmerEvents.length === 0 ? (
              <div className="text-center py-8">
                <Star size={24} className="text-line mx-auto mb-2" />
                <p className="text-ink-400 text-sm">
                  Follow a swimmer or team to see their events here.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {followedSwimmerEvents.slice(0, 12).map((e, i) => (
                  <div
                    key={i}
                    className="lower-third flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-ink-900 truncate">
                        {e.swimmerName}
                      </div>
                      <div className="text-xs text-ink-500 truncate">
                        Event {e.eventNumber} · {e.eventName}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <div className="text-xs text-gold-700 font-mono">
                        {e.startTime}
                      </div>
                      <div className="text-[10px] text-ink-400">
                        {e.heatLabel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Event grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <h2 className="font-display text-lg uppercase tracking-wide text-ink-800 mb-4">
          Events
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {allEvents.map((ev) => (
            <button
              key={ev.eventNumber}
              onClick={() =>
                navigate({ name: 'heat-sheets', event: String(ev.eventNumber) })
              }
              className="glass-card p-4 text-left hover:border-green-400 transition group"
            >
              <div className="text-xs text-ink-400 mb-1">
                Event {ev.eventNumber}
              </div>
              <div className="text-sm font-medium text-ink-800 leading-snug group-hover:text-green-800 transition">
                {ev.eventName}
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-ink-400">
                <span>{ev.heats.length} heats</span>
                <span>·</span>
                <span>{ev.totalEntries} entries</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
