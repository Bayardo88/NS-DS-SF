import { fetchCollection } from '../../lib/wp';
import { useAsync } from '../../lib/useAsync';
import { entryHref, metaList, metaMedia } from '../../lib/entries';
import { SmartLink } from '../../layout/RouterLink';
import { featuredPost } from './posts';
import { PostTags } from './PostTags';
import './FeaturedPost.css';

export interface FeaturedPostProps {
  /** Pin a post by slug; otherwise the post flagged `featured` in WordPress (annotation 57:103725). */
  slug?: string;
}

/**
 * Main Blog Post (Figma 1:4861): the featured post as a full-bleed photo with its title and tags.
 * Becomes a rounded card on mobile. The whole block is one link.
 */
export function FeaturedPost({ slug }: FeaturedPostProps) {
  const posts = useAsync('posts', fetchCollection);
  const list = posts.data ?? [];
  const post = (slug && list.find((p) => p.slug === slug)) || featuredPost(list);

  if (!post) return <div className="featured-post featured-post--loading" aria-busy={posts.status === 'loading'} />;

  const image = metaMedia(post);
  const tags = metaList(post, 'tags');
  return (
    <section className="featured-post" aria-label="Featured article">
      <div className="featured-post__card">
        {image && <img className="featured-post__img" src={image.src} alt="" />}
        <div className="container featured-post__content">
          <h2 className="featured-post__title ns-text-web-banner-black">
            <SmartLink className="featured-post__link" href={entryHref.post(post.slug)}>
              {post.title}
            </SmartLink>
          </h2>
          <PostTags tags={tags} />
        </div>
      </div>
    </section>
  );
}
