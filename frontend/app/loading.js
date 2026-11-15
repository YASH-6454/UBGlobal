import BrandLoader from './components/ui/BrandLoader';

// Shown instantly while a page (e.g. a product or blog post) waits for the API.
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <BrandLoader size="sm" />
    </div>
  );
}
