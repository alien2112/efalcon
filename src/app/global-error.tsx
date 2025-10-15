'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">Error</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Something went wrong</h2>
            <button 
              onClick={reset}
              className="bg-[#EFC132] text-white px-6 py-3 rounded-lg hover:bg-[#5a4d05] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

