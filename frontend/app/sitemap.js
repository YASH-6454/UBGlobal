import { blogPosts } from './blog/blogData';

export default function sitemap() {
  const baseUrl = 'https://www.ubglobal.in';

  // Core static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/engineering',
    '/agriculture',
    '/it-services',
    '/handcrafts',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Engineering product pages
  const engineeringPages = [
    '/engineering/bright-bars',
    '/engineering/black-bars',
    '/engineering/alloy-steel',
    '/engineering/carbon-steel',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Agriculture product pages
  const agriculturePages = [
    '/agriculture/fruits',
    '/agriculture/vegetables',
    '/agriculture/spices',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // IT Services product pages
  const itPages = [
    '/it-services/web-development',
    '/it-services/app-development',
    '/it-services/cloud-devops',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Handcrafts product pages
  const handcraftsPages = [
    '/handcrafts/diyas',
    '/handcrafts/tea-light-holders',
    '/handcrafts/pooja-accessories',
    '/handcrafts/festival-decor',
    '/handcrafts/private-label',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic Blog pages
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...engineeringPages,
    ...agriculturePages,
    ...itPages,
    ...handcraftsPages,
    ...blogUrls,
  ];
}
