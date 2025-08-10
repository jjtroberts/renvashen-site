import fs from 'fs';
import path from 'path';
import { getCollection } from 'astro:content';

export async function get() {
  const articles = await getCollection('article');
  const index = articles.map(({ slug, data }) => ({
    title: data.title,
    description: data.description,
    author: data.author,
    category: data.category,
    tags: data.tags,
    featured: data.featured,
    thumb: data.thumb,
    large: data.large,
    url: `/article/${slug}`,
  }));
  fs.writeFileSync(
    path.join(process.cwd(), 'public/search-index.json'),
    JSON.stringify(index, null, 2)
  );
  return {
    body: JSON.stringify({ success: true, count: index.length })
  };
}
