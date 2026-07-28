import { useMemo } from 'react';
import meetConfig from '@/data/meet-config.json';
import athletes from '@/data/athletes.json';
import events from '@/data/events.json';
import type { MeetConfig, Athlete, MeetEvent } from '@/types/meet';

export function useMeetData() {
  const config = useMemo(() => meetConfig as MeetConfig, []);
  const allAthletes = useMemo(() => athletes as Athlete[], []);
  const allEvents = useMemo(() => events as MeetEvent[], []);

  const athleteByUss = useMemo(() => {
    const map = new Map<string, Athlete>();
    for (const a of allAthletes) {
      if (!map.has(a.uss)) map.set(a.uss, a);
    }
    return map;
  }, [allAthletes]);

  return { config, allAthletes, allEvents, athleteByUss };
}
