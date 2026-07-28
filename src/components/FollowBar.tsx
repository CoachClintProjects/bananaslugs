import { useState } from 'react';
import { Star, X, Plus } from 'lucide-react';
import { useFollow } from '@/context/FollowContext';
import { FollowPicker } from './FollowPicker';

export function FollowBar() {
  const { swimmers, teams, unfollowSwimmer, unfollowTeam } = useFollow();
  const [pickerOpen, setPickerOpen] = useState(false);

  if (swimmers.length === 0 && teams.length === 0) {
    return (
      <>
        <div className="glass-card flex items-center justify-between px-4 py-2.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-ink-500">
            <Star size={15} className="text-gold-600" />
            <span>Follow a swimmer or team to track them across the meet</span>
          </div>
          <button
            onClick={() => setPickerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-600 text-white text-xs font-medium hover:bg-gold-700 transition"
          >
            <Plus size={14} /> Add
          </button>
        </div>
        <FollowPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
      </>
    );
  }

  return (
    <>
      <div className="glass-card px-4 py-2.5 mb-4 animate-slide-up">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-700 shrink-0">
            <Star size={13} fill="currentColor" /> Following
          </span>

          {swimmers.map((s) => (
            <div
              key={s.uss}
              className="flex items-center gap-1.5 bg-gold-100 border border-gold-300 rounded-full pl-2.5 pr-1 py-0.5"
            >
              <span className="text-sm text-gold-700 font-medium">
                {s.name}
              </span>
              {s.abbr && (
                <span className="text-xs text-gold-600/70">{s.abbr}</span>
              )}
              <button
                onClick={() => unfollowSwimmer(s.uss)}
                className="text-gold-600/60 hover:text-gold-700 transition p-0.5"
              >
                <X size={13} />
              </button>
            </div>
          ))}

          {teams.map((t) => (
            <div
              key={t.abbr}
              className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full pl-2.5 pr-1 py-0.5"
            >
              <span className="text-sm text-green-800 font-medium">
                {t.name || t.abbr}
              </span>
              <button
                onClick={() => unfollowTeam(t.abbr)}
                className="text-green-600 hover:text-green-800 transition p-0.5"
              >
                <X size={13} />
              </button>
            </div>
          ))}

          <button
            onClick={() => setPickerOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-line text-ink-500 text-xs hover:border-green-400 hover:text-green-700 transition"
          >
            <Plus size={13} /> Add
          </button>
        </div>
      </div>
      <FollowPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </>
  );
}
