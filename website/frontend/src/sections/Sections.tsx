import type { SectionData } from '../lib/types';
import { registry } from './registry';

/** Renders WordPress `ns_sections` in order. Unknown types show a dev placeholder. */
export function Sections({ sections }: { sections: SectionData[] }) {
  return (
    <>
      {sections.map((section, i) => {
        const Component = registry[section.type];
        const key = section.id ?? `${section.type}-${i}`;
        if (!Component) {
          return import.meta.env.DEV ? (
            <section key={key} className="section container">
              <p className="ns-text-web-caption-light">Unknown section type “{section.type}”</p>
            </section>
          ) : null;
        }
        return <Component key={key} {...section} />;
      })}
    </>
  );
}
