/** Builds the article TOC from the post body: gives every h2/h3 a stable id and returns the tree. */

export interface TocItem {
  id: string;
  label: string;
  children: TocItem[];
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  );
}

export function buildToc(html: string): { html: string; toc: TocItem[] } {
  if (!html || typeof DOMParser === 'undefined') return { html, toc: [] };
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const used = new Set<string>();
  const toc: TocItem[] = [];
  doc.body.querySelectorAll('h2, h3').forEach((heading) => {
    const label = heading.textContent?.trim() ?? '';
    const base = heading.id || slugify(label);
    let id = base;
    for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
    used.add(id);
    heading.id = id;
    heading.setAttribute('tabindex', '-1');
    const item = { id, label, children: [] };
    const parent = toc[toc.length - 1];
    if (heading.tagName === 'H3' && parent) parent.children.push(item);
    else toc.push(item);
  });
  return { html: doc.body.innerHTML, toc };
}
