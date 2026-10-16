import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchRoute, NotFoundError } from '../lib/wp';
import { useAsync } from '../lib/useAsync';
import { Sections } from '../sections/Sections';
import { EntryContext } from '../lib/EntryContext';

/** Resolves the URL through WordPress and renders the entry's sections in order. */
export function RoutePage() {
  const { pathname } = useLocation();
  const route = useAsync(pathname, fetchRoute);
  const title = route.data?.data.title;

  useEffect(() => {
    if (title) document.title = title === 'Home' ? 'NicaSource · Nearshore Staff Augmentation' : `${title} · NicaSource`;
  }, [title]);

  if (route.status === 'loading') return <div className="route-loading" aria-busy="true" />;
  if (route.status === 'error') {
    const missing = route.error instanceof NotFoundError;
    return (
      <section className="section container route-error">
        <h1 className="ns-text-web-h1-light">{missing ? 'Page not found' : 'Something went wrong'}</h1>
        <p className="ns-text-web-body-light">{missing ? `Nothing lives at ${pathname} yet.` : route.error.message}</p>
      </section>
    );
  }

  const { data, source } = route.data;
  return (
    <EntryContext.Provider value={data}>
      <Sections sections={data.sections} />
      {import.meta.env.DEV && (
        <p className="source-badge ns-text-web-small-regular" aria-hidden="true">
          {source === 'wordpress' ? 'WordPress' : 'Seed JSON (WordPress offline)'}
        </p>
      )}
    </EntryContext.Provider>
  );
}
