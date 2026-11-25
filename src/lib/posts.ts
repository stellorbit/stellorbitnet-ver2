import { astroPosts } from '../content/astro-posts';

export interface ListedPost {
  slug: string;
  title: string;
  description?: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  categories: string[];
  link: string;
  isAiGenerated?: boolean;
}

export async function getListedPosts(): Promise<ListedPost[]> {
  return astroPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
      updatedDate: post.updatedDate,
      tags: post.tags,
      categories: post.categories,
      link: `/posts/${post.slug}/`,
      isAiGenerated: post.isAiGenerated ?? false,
    }))
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}
