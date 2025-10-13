import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
        <Link 
          href="/en" 
          className="bg-[#716106] text-white px-6 py-3 rounded-lg hover:bg-[#5a4d05] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
