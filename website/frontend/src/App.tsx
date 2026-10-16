import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './layout/SiteLayout';
import { RoutePage } from './layout/RoutePage';

/** Every URL is resolved by WordPress (ns/v1/route); the layout comes from ns/v1/site. */
export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="*" element={<RoutePage />} />
      </Route>
    </Routes>
  );
}
