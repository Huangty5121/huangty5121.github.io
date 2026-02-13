import rss from '@astrojs/rss';
import { getCollection }from 'astro:content';
import type { APIContext }from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Frosty Neon — The Signal',
    description: 'Technical articles and life musings from Frosty Neon.',
    site: context.site ?? 'https://huangty5121.github.io',
    items: posts.map((post) => {
      const slug = post.id.replace(/^(zh|en)\//, '').replace(/\.(md|mdx)$/, '');
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/signal/${slug}/`,
      };
    }),
    customData: '<language>zh-cn</language>',
  });
}
