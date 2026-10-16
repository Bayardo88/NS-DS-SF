import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '@nicasource/ds';
import { fetchSite } from '../lib/wp';
import { useAsync } from '../lib/useAsync';
import { SiteContext } from '../lib/SiteContext';
import { renderRouterLink } from './RouterLink';
import { Footer } from './Footer';

function activeHref(pathname: string, hrefs: string[]) {
  return hrefs
    .filter((href) => (href === '/' ? pathname === '/' : pathname.startsWith(href)))
    .sort((a, b) => b.length - a.length)[0];
}

export function SiteLayout() {
  const site = useAsync('site', fetchSite);
  const { pathname } = useLocation();

  // New route: start at the top, like a full page load.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const nav = site.data?.nav ?? [];

  return (
    <SiteContext.Provider value={site.data ?? null}>
      <SiteHeader
        className="site-header"
        links={nav}
        current={activeHref(pathname, nav.map((l) => l.href))}
        renderLink={renderRouterLink}
        skipLinkHref="#main"
        logoVariant="on-dark"
      />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      {site.data?.footer && <Footer site={site.data} />}
    </SiteContext.Provider>
  );
}
