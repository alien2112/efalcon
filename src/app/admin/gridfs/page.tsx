'use client';

import { GridFSUploadForm } from '@/components/admin/GridFSUploadForm';
import { Navigation } from '@/components/Navigation';

export default function GridFSAdminPage() {
  return (
    <>
      <Navigation currentSection="admin" onNavigate={() => {}} />
      <div className="min-h-screen bg-gray-50 pt-20">
        <GridFSUploadForm />
      </div>
    </>
  );
}
