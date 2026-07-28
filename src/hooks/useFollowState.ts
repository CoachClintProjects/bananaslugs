import { useCallback, useEffect, useState } from 'react';
import type { FollowedSwimmer, FollowedTeam } from '@/types/meet';

const SWIMMER_KEY = 'hpac_followed_swimmers';
const TEAM_KEY = 'hpac_followed_teams';

function readSwimmers(): FollowedSwimmer[] {
  try {
    const raw = localStorage.getItem(SWIMMER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function readTeams(): FollowedTeam[] {
  try {
    const raw = localStorage.getItem(TEAM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFollowState() {
  const [swimmers, setSwimmers] = useState<FollowedSwimmer[]>(readSwimmers);
  const [teams, setTeams] = useState<FollowedTeam[]>(readTeams);

  useEffect(() => {
    localStorage.setItem(SWIMMER_KEY, JSON.stringify(swimmers));
  }, [swimmers]);

  useEffect(() => {
    localStorage.setItem(TEAM_KEY, JSON.stringify(teams));
  }, [teams]);

  const followSwimmer = useCallback((s: FollowedSwimmer) => {
    setSwimmers((prev) =>
      prev.some((x) => x.uss === s.uss) ? prev : [...prev, s]
    );
  }, []);

  const unfollowSwimmer = useCallback((uss: string) => {
    setSwimmers((prev) => prev.filter((x) => x.uss !== uss));
  }, []);

  const followTeam = useCallback((t: FollowedTeam) => {
    setTeams((prev) =>
      prev.some((x) => x.abbr === t.abbr) ? prev : [...prev, t]
    );
  }, []);

  const unfollowTeam = useCallback((abbr: string) => {
    setTeams((prev) => prev.filter((x) => x.abbr !== abbr));
  }, []);

  const clearAll = useCallback(() => {
    setSwimmers([]);
    setTeams([]);
  }, []);

  const isSwimmerFollowed = useCallback(
    (uss: string) => swimmers.some((x) => x.uss === uss),
    [swimmers]
  );

  const isTeamFollowed = useCallback(
    (abbr: string) => teams.some((x) => x.abbr === abbr),
    [teams]
  );

  return {
    swimmers,
    teams,
    followSwimmer,
    unfollowSwimmer,
    followTeam,
    unfollowTeam,
    clearAll,
    isSwimmerFollowed,
    isTeamFollowed,
  };
}
