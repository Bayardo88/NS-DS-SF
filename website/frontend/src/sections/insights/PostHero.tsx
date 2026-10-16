import { useEntry } from '../../lib/EntryContext';
import { metaList, metaMedia, metaString } from '../../lib/entries';
import { Breadcrumb } from '../../components/Breadcrumb';
import { formatPostDate, postAuthor } from './posts';
import { PostTags } from './PostTags';
import './PostHero.css';

/**
 * Blog post hero (Figma Main Blog Post 1:5336), a template section: reads the post being rendered
 * (`useEntry()`) for the featured image, title, tags and the date · reading-time meta line the spec
 * recommends. Tags link to the insights index filtered by tag.
 */
export function PostHero() {
  const post = useEntry();
  if (!post) return null;

  const image = metaMedia(post);
  const author = postAuthor(post);
  const meta = [formatPostDate(post), metaString(post, 'reading_time'), author && `By ${author.name}`].filter(Boolean);

  return (
    <section className="post-hero">
      {image && <img className="post-hero__img" src={image.src} alt="" />}
      <Breadcrumb
        className="post-hero__breadcrumb container"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Insights', href: '/insights' },
          { label: post.title, href: `/insights/${post.slug}` },
        ]}
      />
      <div className="container post-hero__content">
        <h1 className="post-hero__title ns-text-web-banner-black">{post.title}</h1>
        {meta.length > 0 && <p className="post-hero__meta ns-text-web-caption-light">{meta.join(' · ')}</p>}
        <PostTags tags={metaList(post, 'tags')} linked />
      </div>
    </section>
  );
}
