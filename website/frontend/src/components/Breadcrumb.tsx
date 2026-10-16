import { Fragment } from 'react';
import { Icon } from '@nicasource/ds';
import type { Link } from '../lib/types';
import { SmartLink } from '../layout/RouterLink';
import './Breadcrumb.css';

/** Breadcrumb trail; the last item is the current page. Not a DS component (composed locally). */
export function Breadcrumb({ items, className }: { items: Link[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="breadcrumb ns-text-web-caption-light">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={item.href}>
              <li className="breadcrumb__item">
                {i === 0 && <Icon name="home" size="sm" />}
                {last ? (
                  <span aria-current="page">{item.label}</span>
                ) : (
                  <SmartLink className="breadcrumb__link" href={item.href}>
                    {item.label}
                  </SmartLink>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className="breadcrumb__sep">
                  <Icon name="chevron-right" size="sm" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
