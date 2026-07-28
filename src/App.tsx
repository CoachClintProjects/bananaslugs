import { FollowProvider } from '@/context/FollowContext';
import { useRouter } from '@/hooks/useRouter';
import { NavBar } from '@/components/NavBar';
import { FollowBar } from '@/components/FollowBar';
import { LandingPage } from '@/pages/LandingPage';
import { HeatSheetsPage } from '@/pages/HeatSheetsPage';
import { StubPage } from '@/pages/StubPage';

function App() {
  const { route, navigate } = useRouter();

  return (
    <FollowProvider>
      <div className="min-h-screen bg-canvas">
        <NavBar route={route} navigate={navigate} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          {route.name !== 'landing' && <FollowBar />}
          {route.name === 'landing' && <LandingPage navigate={navigate} />}
          {route.name === 'heat-sheets' && (
            <HeatSheetsPage navigate={navigate} event={route.event} />
          )}
          {route.name === 'psych-sheets' && (
            <StubPage title="Psych Sheets" navigate={navigate} />
          )}
          {route.name === 'results' && (
            <StubPage title="Results" navigate={navigate} />
          )}
          {route.name === 'timeline' && (
            <StubPage title="Timeline" navigate={navigate} />
          )}
          {route.name === 'profile' && (
            <StubPage title="Swimmer Profile" navigate={navigate} />
          )}
        </main>
      </div>
    </FollowProvider>
  );
}

export default App;
