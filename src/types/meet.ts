export interface MeetSession {
  key: string;
  label: string;
  type: 'all' | 'timed-finals' | 'prelims' | 'finals';
}

export interface MeetConfig {
  meetName: string;
  sessionName: string;
  location: string;
  dates: string;
  startTime: string;
  host: string;
  logo: string;
  generatedFrom: string[];
  sessions: MeetSession[];
}

export interface Athlete {
  uss: string;
  lastName: string;
  firstName: string;
  displayName: string;
  middleInitial?: string;
  gender: 'M' | 'F';
  age: number;
  abbr: string;
  team: string;
  birthDate?: string;
  preferredName?: string;
  status?: string;
}

export interface Standard {
  label: string;
  time: string;
}

export interface HeatEntry {
  lane: string;
  name: string;
  firstName: string;
  lastName: string;
  displayName: string;
  age: number;
  abbr: string;
  team: string;
  seed: string;
  uss: string;
  swimmerKey: string;
}

export interface Heat {
  heatNumber: number;
  heatLabel: string;
  rawLabel: string;
  totalHeats: number | null;
  startTime: string;
  phase: string;
  combinedWith: string;
  entries: HeatEntry[];
}

export interface MeetEvent {
  eventNumber: number;
  eventName: string;
  heats: Heat[];
  standards: Standard[];
  qualifying: string[];
  totalSections: number;
  totalEntries: number;
  teams: string[];
}

export interface FollowedSwimmer {
  uss: string;
  name: string;
  team?: string;
  abbr?: string;
}

export interface FollowedTeam {
  abbr: string;
  name?: string;
}
