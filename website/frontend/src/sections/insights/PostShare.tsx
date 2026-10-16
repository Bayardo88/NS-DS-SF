import { useState } from 'react';
import { IconButton } from '@nicasource/ds';

export interface PostShareProps {
  url: string;
  title: string;
}

/**
 * Share row (Figma 1:5383): native share with a copy-link fallback, LinkedIn and Facebook.
 * Instagram (in Figma) has no web share intent, so LinkedIn takes its place (blog-post.md notes).
 */
export function PostShare({ url, title }: PostShareProps) {
  const [status, setStatus] = useState('');

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus('Link copied to clipboard');
    } catch (err) {
      if ((err as Error).name !== 'AbortError') setStatus('Could not share this link');
    }
  }

  const encoded = encodeURIComponent(url);
  return (
    <div className="post-share">
      <p className="post-article__side-title ns-text-web-h4-black">Share</p>
      <div className="post-share__row">
        <IconButton variant="text" icon="share" aria-label="Share this article" onClick={handleShare} />
        <IconButton asChild variant="text" icon="linkedin" aria-label="Share on LinkedIn (opens in a new tab)">
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </IconButton>
        <IconButton asChild variant="text" icon="facebook" aria-label="Share on Facebook (opens in a new tab)">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </IconButton>
      </div>
      <p className="post-share__status ns-text-web-caption-light" role="status">
        {status}
      </p>
    </div>
  );
}
