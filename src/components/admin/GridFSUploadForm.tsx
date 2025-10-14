'use client';

import { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';

interface UploadedImage {
  _id: string;
  filename: string;
  contentType: string;
  metadata: {
    title: string;
    description: string;
    order: number;
    isActive: boolean;
  };
}

export function GridFSUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.split('.')[0]);
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('order', order.toString());
      formData.append('isActive', isActive.toString());

      const response = await fetch('/api/gridfs/images', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Image uploaded successfully!');
        setFile(null);
        setTitle('');
        setDescription('');
        setOrder(1);
        setIsActive(true);
        // Refresh the list
        fetchImages();
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error uploading image: ${error}`);
    } finally {
      setUploading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/gridfs/images');
      const result = await response.json();
      if (result.success) {
        setUploadedImages(result.data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const deleteImage = async (id: string) => {
    try {
      const response = await fetch(`/api/gridfs/images?_id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setMessage('Image deleted successfully!');
        fetchImages();
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error deleting image: ${error}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">GridFS Image Upload</h2>
      
      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">File</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Order</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isActive">Active</label>
        </div>

        <button
          type="submit"
          disabled={uploading || !file}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </>
          )}
        </button>
      </form>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded mb-6 ${
          message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Uploaded Images List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Uploaded Images</h3>
          <button
            onClick={fetchImages}
            className="text-blue-500 hover:text-blue-700"
          >
            Refresh
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadedImages.map((image) => (
            <div key={image._id} className="border rounded p-4">
              <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                <img
                  src={`/api/gridfs/images/${image._id}`}
                  alt={image.metadata.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h4 className="font-medium">{image.metadata.title}</h4>
              <p className="text-sm text-gray-600">{image.metadata.description}</p>
              <p className="text-xs text-gray-500">Order: {image.metadata.order}</p>
              <p className="text-xs text-gray-500">
                Status: {image.metadata.isActive ? 'Active' : 'Inactive'}
              </p>
              <button
                onClick={() => deleteImage(image._id)}
                className="mt-2 text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
