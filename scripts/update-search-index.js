// scripts/update-search-index.js
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = path.join(process.cwd(), 'src/content/article');
const outputFile = path.join(process.cwd(), 'public/search-index.json');

async function getArticleData(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const { data } = matter(content);

  // Build the object for search-index.json
  return {
    title: data.title || '',
    description: data.description || '',
    author: data.author || '',
    category: data.category || '',
    tags: data.tags || [],
    featured: data.featured || false,
    thumb: data.thumb || '',
    large: data.large || '',
    url: `/article/${path.basename(filePath, '.md')}`,
  };
}

async function main() {
  const files = await fs.readdir(articlesDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const articles = [];
  for (const file of mdFiles) {
    const filePath = path.join(articlesDir, file);
    const articleData = await getArticleData(filePath);
    articles.push(articleData);
  }

  await fs.writeFile(outputFile, JSON.stringify(articles, null, 2));
  console.log(`Updated ${outputFile} with ${articles.length} articles.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});