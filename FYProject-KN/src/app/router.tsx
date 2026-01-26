import { useEffect, useState } from 'react';
import Dashboard from '../pages/Dashboard';
import Editor from '../pages/Editor';
import Auth from '../pages/Auth';

export type Route = 'dashboard' | 'editor' | 'auth';

function getRouteFromHash(): Route {
  const h = window.location.hash.replace('#', '').toLowerCase();
  if (h === 'editor') return 'editor';
  if (h === 'auth') return 'auth';
  return 'dashboard';
}

export default function AppRouter() {
  const [route, setRoute] = useState<Route>(getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  switch (route) {
    case 'editor':
      return <Editor />;
    case 'auth':
      return <Auth />;
    default:
      return <Dashboard />;
  }
}
