'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Store token and user data
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data.admin));
        localStorage.setItem('adminTokenIssuedAt', Date.now().toString());
        
        setSuccess(t('admin.login.loginSuccess'));
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        setError(data.error || t('admin.login.loginFailed'));
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(t('admin.login.loginFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative max-w-md w-full space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-amber-500 to-yellow-600 ring-1 ring-white/10">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-extrabold text-white">
            {t('admin.login.title')}
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            {t('admin.login.description')}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-sm py-6 sm:py-8 px-4 sm:px-6 shadow-2xl rounded-2xl ring-1 ring-slate-200">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                {t('admin.login.username')}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 sm:py-2 border border-slate-300 rounded-md placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500/60 text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('admin.login.password')}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full pl-10 pr-10 py-2 sm:py-2 border border-slate-300 rounded-md placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500/60 text-sm"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-red-700">{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-green-700">{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || !formData.username || !formData.password}
                className="group relative w-full flex justify-center py-2 sm:py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t('admin.login.loggingIn')}
                  </>
                ) : (
                  t('admin.login.loginButton')
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-slate-400">
            Default credentials: admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
}