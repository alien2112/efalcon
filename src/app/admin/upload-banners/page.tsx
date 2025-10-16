'use client';

import { useState } from 'react';
import { Upload, CheckCircle, XCircle, Loader } from 'lucide-react';

interface UploadResult {
  uploaded: Array<{
    fileId: string;
    fileName: string;
    page: string;
    title: string;
  }>;
  errors: string[];
}

export default function UploadBannersPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);

  const handleUpload = async () => {
    setIsUploading(true);
    setResult(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/upload-banners', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      setResult({
        uploaded: [],
        errors: [`Upload failed: ${error}`]
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Upload Banner Images
          </h1>
          
          <p className="text-gray-600 mb-8">
            This will upload all existing banner images from the public folder to GridFS 
            so they can be managed dynamically through the admin panel.
          </p>

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Upload Banner Images
              </>
            )}
          </button>

          {result && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Upload Results</h2>
              
              {result.uploaded.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-green-600 mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Successfully Uploaded ({result.uploaded.length})
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {result.uploaded.map((item, index) => (
                        <li key={index} className="text-sm">
                          <strong>{item.fileName}</strong> - {item.title} ({item.page} page)
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {result.errors.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-red-600 mb-2 flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    Errors ({result.errors.length})
                  </h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {result.errors.map((error, index) => (
                        <li key={index} className="text-sm text-red-700">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




