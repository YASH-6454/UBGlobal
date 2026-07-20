import HomePageClient from './HomePageClient';

// Revalidate data every 60 seconds (Incremental Static Regeneration)
// This perfectly replicates the fast caching layer the user requested.
export const revalidate = 60;

async function getBanners() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/banners`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Error fetching banners:", err);
    return [];
  }
}

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/blogs`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, 3); // Get only the latest 3 for the homepage
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return [];
  }
}

export default async function Page() {
  // Fetch data on the server
  const banners = await getBanners();
  const blogs = await getBlogs();

  // Pass it as props to the Client Component
  return <HomePageClient initialBanners={banners} initialBlogs={blogs} />;
}
