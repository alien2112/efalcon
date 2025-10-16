'use client';

import { useState } from 'react';
import { UserPlus, CheckCircle, XCircle, Loader } from 'lucide-react';

export default function CreateAdminPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleCreateAdmin = async () => {
    setIsCreating(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin123',
          email: 'admin@ebdaafalcon.com'
        })
      });

      const data = await response.json();
      setResult({
        success: data.success,
        message: data.message || data.error
      });
    } catch (error) {
      setResult({
        success: false,
        message: `Failed to create admin: ${error}`
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Create Admin User
          </h1>
          
          <p className="text-gray-600 mb-8">
            This will create the initial admin user with the following credentials:
            <br />
            <strong>Username:</strong> admin
            <br />
            <strong>Password:</strong> admin123
            <br />
            <strong>Email:</strong> admin@ebdaafalcon.com
          </p>

          <button
            onClick={handleCreateAdmin}
            disabled={isCreating}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" />
                Create Admin User
              </>
            )}
          </button>

          {result && (
            <div className="mt-8">
              <div className={`flex items-center p-4 rounded-lg ${
                result.success 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {result.success ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2" />
                )}
                <span>{result.message}</span>
              </div>
              
              {result.success && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700">
                    Admin user created successfully! You can now go back to the 
                    <a href="/admin" className="underline font-medium"> login page</a> to access the admin dashboard.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




