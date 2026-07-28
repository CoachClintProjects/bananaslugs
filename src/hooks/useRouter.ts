import { useEffect, useState, useCallback } from 'react';

export type Route =
  | { name: 'landing' }
  | { name: 'heat-sheets'; event?: string }
  | { name: 'psych-sheets'; event?: string }
  | { name: 'results'; event?: string }
  | { name: 'timeline' }
  | { name: 'profile'; uss?: string };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [path, query] = hash.split('?');
  const parts = path.split('/');
  const params = new URLSearchParams(query || '');

  switch (parts[0]) {
    case '':
    case undefined:
      return { name: 'landing' };
    case 'heat-sheets':
      return { name: 'heat-sheets', event: params.get('event') || undefined };
    case 'psych-sheets':
      return { name: 'psych-sheets', event: params.get('event') || undefined };
    case 'results':
      return { name: 'results', event: params.get('event') || undefined };
    case 'timeline':
      return { name: 'timeline' };
    case 'profile':
      return { name: 'profile', uss: params.get('uss') || undefined };
    default:
      return { name: 'landing' };
  }
}

function toHash(route: Route): string {
  switch (route.name) {
    case 'landing':
      return '#/';
    case 'heat-sheets':
    case 'psych-sheets':
    case 'results': {
      const base = route.name;
      const params = new URLSearchParams();
      if (route.event) params.set('event', route.event);
      const qs = params.toString();
      return `#/${base}${qs ? `?${qs}` : ''}`;
    }
    case 'timeline':
      return '#/timeline';
    case 'profile': {
      const params = new URLSearchParams();
      if (route.uss) params.set('uss', route.uss);
      return `#/profile?${params.toString()}`;
    }
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((r: Route) => {
    window.location.hash = toHash(r);
  }, []);

  return { route, navigate };
}
