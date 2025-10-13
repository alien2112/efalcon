'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, Edit, Plus, Eye } from 'lucide-react';
import Image from 'next/image';

interface ImageData {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  position?: 'left' | 'right';
  order?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface LoginResponse { token: string }

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [visionImages, setVisionImages] = useState<ImageData[]>([]);
  const [servicesImages, setServicesImages] = useState<ImageData[]>([]);
  const [workImages, setWorkImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Login form
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
  const [activeTab, setActiveTab] = useState('vision');

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    position: 'left' as 'left' | 'right',
    order: 1
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchAllImages(savedToken);
    }
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const result: ApiResponse<LoginResponse> = await response.json();

      if (result.success && result.data?.token) {
        setToken(result.data.token);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', result.data.token);
        setShowLoginForm(false);
        fetchAllImages(result.data.token);
        showMessage('success', 'Login successful!');
      } else {
        showMessage('error', result.error || 'Login failed');
      }
    } catch (error) {
      showMessage('error', 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
    setShowLoginForm(true);
    setVisionImages([]);
    setServicesImages([]);
    setWorkImages([]);
  };

  const fetchAllImages = async (authToken: string) => {
    try {
      const [visionRes, servicesRes, workRes] = await Promise.all([
        fetch('/api/admin/vision-images'),
        fetch('/api/admin/services-images'),
        fetch('/api/admin/work-images')
      ]);

      const visionData: ApiResponse<ImageData[]> = await visionRes.json();
      const servicesData: ApiResponse<ImageData[]> = await servicesRes.json();
      const workData: ApiResponse<ImageData[]> = await workRes.json();

      if (visionData.success) setVisionImages(visionData.data || []);
      if (servicesData.success) setServicesImages(servicesData.data || []);
      if (workData.success) setWorkImages(workData.data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);

    try {
      const endpoint = `/api/admin/${activeTab}-images`;
      const method = editingImage ? 'PUT' : 'POST';
      
      const body = editingImage 
        ? { _id: editingImage._id, ...formData }
        : formData;

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        showMessage('success', editingImage ? 'Image updated successfully!' : 'Image added successfully!');
        setShowAddForm(false);
        setEditingImage(null);
        resetForm();
        fetchAllImages(token);
      } else {
        showMessage('error', result.error || 'Operation failed');
      }
    } catch (error) {
      showMessage('error', 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Are you sure you want to delete this image?')) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/${activeTab}-images?_id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        showMessage('success', 'Image deleted successfully!');
        fetchAllImages(token);
      } else {
        showMessage('error', result.error || 'Delete failed');
      }
    } catch (error) {
      showMessage('error', 'Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image: ImageData) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      imageUrl: image.imageUrl,
      position: image.position || 'left',
      order: image.order || 1
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      position: 'left',
      order: 1
    });
  };

  const getCurrentImages = () => {
    switch (activeTab) {
      case 'vision': return visionImages;
      case 'services': return servicesImages;
      case 'work': return workImages;
      default: return [];
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            {message && (
              <Alert className={`mt-4 ${message.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
                <AlertDescription className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                  {message.text}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Message */}
        {message && (
          <Alert className={`mb-6 ${message.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
            <AlertDescription className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vision">Vision Images</TabsTrigger>
            <TabsTrigger value="services">Services Images</TabsTrigger>
            <TabsTrigger value="work">Work Images</TabsTrigger>
          </TabsList>

          {/* Vision Images Tab */}
          <TabsContent value="vision" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Vision Images</h2>
              <Button onClick={() => { resetForm(); setShowAddForm(true); setEditingImage(null); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Vision Image
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visionImages.map((image) => (
                <Card key={image._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{image.title}</CardTitle>
                        <CardDescription>Position: {image.position}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(image)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(image._id!)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full">
                        <Image
                          src={image.imageUrl}
                          alt={image.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{image.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Images Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Services Images</h2>
              <Button onClick={() => { resetForm(); setShowAddForm(true); setEditingImage(null); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service Image
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesImages.map((image) => (
                <Card key={image._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{image.title}</CardTitle>
                        <CardDescription>Order: {image.order}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(image)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(image._id!)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full">
                        <Image
                          src={image.imageUrl}
                          alt={image.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{image.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Work Images Tab */}
          <TabsContent value="work" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Work Images</h2>
              <Button onClick={() => { resetForm(); setShowAddForm(true); setEditingImage(null); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Work Image
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workImages.map((image) => (
                <Card key={image._id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{image.title}</CardTitle>
                        <CardDescription>Order: {image.order}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(image)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(image._id!)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full">
                        <Image
                          src={image.imageUrl}
                          alt={image.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <p className="text-sm text-gray-600">{image.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>{editingImage ? 'Edit Image' : `Add ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Image`}</CardTitle>
                <CardDescription>
                  {editingImage ? 'Update the image details' : 'Enter the image details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      required
                    />
                  </div>

                  {activeTab === 'vision' && (
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Select value={formData.position} onValueChange={(value: 'left' | 'right') => setFormData({ ...formData, position: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left Box</SelectItem>
                          <SelectItem value="right">Right Box</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {(activeTab === 'services' || activeTab === 'work') && (
                    <div>
                      <Label htmlFor="order">Order</Label>
                      <Input
                        id="order"
                        type="number"
                        min="1"
                        max={activeTab === 'work' ? '4' : undefined}
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        required
                      />
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1" disabled={loading}>
                      {loading ? 'Saving...' : (editingImage ? 'Update' : 'Add')}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => { setShowAddForm(false); setEditingImage(null); resetForm(); }}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
