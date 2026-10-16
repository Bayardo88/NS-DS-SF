import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Media } from '../../lib/types';
import { Rich } from '../../components/Rich';
import { ContactModule, type ContactModuleProps, type InquiryType } from '../ContactModule';
import './ContactPage.css';

interface Panel {
  heading: string;
  body?: string;
  image?: Media;
}

export interface ContactPageProps {
  /** Form title ("Ready to **Drop a Line?**"). */
  heading?: string;
  /** Right-hand photo, headline and copy per tab (annotation 57:103755). */
  panels: Record<InquiryType, Panel>;
  /** NS chevron layer behind the people, the same in every tab. */
  chevron?: Media;
  tabLabels?: ContactModuleProps['tabLabels'];
  services?: string[];
}

/** `?type=` values other pages deep-link with ("Explore Careers" → join-team). */
const TYPE_PARAM: Record<string, InquiryType> = {
  'new-business': 'project',
  project: 'project',
  'join-team': 'team',
  team: 'team',
  general: 'general',
};

const ORDER: InquiryType[] = ['project', 'team', 'general'];

/**
 * Contact Us v2 (Figma 1189:11431 / 11490 / 11372): split hero. Left: the shared Contact Module
 * (tabs, fields, chips, upload, message) on the surface color. Right: per-tab photo, headline and
 * copy that cross-fade when the tab changes. The tab state lives here and drives both halves (K7).
 */
export function ContactPage({
  heading = 'Ready to **Drop a Line?**',
  panels,
  chevron,
  tabLabels = { project: 'New Business' },
  services,
}: ContactPageProps) {
  const [params] = useSearchParams();
  const [type, setType] = useState<InquiryType>(() => TYPE_PARAM[params.get('type') ?? ''] ?? 'project');
  const panel = panels[type];

  return (
    <section className="contact-page">
      <div className="contact-page__media">
        {chevron && <img className="contact-page__layer" src={chevron.src} alt="" />}
        {ORDER.map((id) => {
          const image = panels[id]?.image;
          return (
            image && (
              <img
                key={id}
                className="contact-page__layer contact-page__person"
                src={image.src}
                alt={id === type ? image.alt : ''}
                aria-hidden={id === type ? undefined : true}
                data-active={id === type}
              />
            )
          );
        })}
        <div key={type} className="contact-page__copy" aria-live="polite">
          <Rich as="h1" className="contact-page__headline ns-text-web-h2-light" text={panel.heading} />
          {panel.body && <Rich as="p" className="contact-page__body ns-text-web-h4-light" text={panel.body} />}
        </div>
      </div>

      <div className="contact-page__form">
        <ContactModule
          layout="page"
          heading={heading}
          services={services}
          tabLabels={tabLabels}
          type={type}
          onTypeChange={setType}
        />
      </div>
    </section>
  );
}
