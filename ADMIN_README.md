# Admin Panel Documentation

## Overview
The admin panel provides a comprehensive interface for managing banner images across all pages of the website. It supports both Arabic and English languages and uses GridFS for efficient image storage.

## Features

### 🔐 Authentication
- Secure login system with JWT tokens
- Password hashing with bcrypt
- Session management with localStorage

### 🖼️ Banner Management
- Upload banner images for different pages (Home, About, Services, Work, Blog, Contact)
- Set display order and active/inactive status
- Delete unwanted images
- Real-time preview of uploaded images

### 🌐 Multi-language Support
- Full Arabic and English support
- Dynamic language switching
- RTL support for Arabic

### 📁 GridFS Integration
- Efficient image storage using MongoDB GridFS
- Automatic image optimization
- Secure image serving with proper headers

## Setup Instructions

### 1. Create Admin User
Run the admin creation script to set up the initial admin user:

```bash
node scripts/create-admin.js
```

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Important:** Change the password after first login!

### 2. Access Admin Panel
Navigate to `/admin` in your browser to access the login page.

### 3. Manage Banner Images
1. Login with your admin credentials
2. Select the page you want to manage (Home, About, Services, etc.)
3. Click "Add Banner Image" to upload new images
4. Set the display order and active status
5. Use the delete button to remove unwanted images

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### Image Management
- `GET /api/gridfs/images` - List all images
- `POST /api/gridfs/images` - Upload new image (Admin only)
- `DELETE /api/gridfs/images?_id={id}` - Delete image (Admin only)
- `GET /api/gridfs/images/{id}` - Serve image file

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Admin login page
│   │   └── dashboard/
│   │       └── page.tsx          # Admin dashboard
│   └── api/
│       ├── admin/
│       │   └── login/
│       │       └── route.ts      # Login API
│       └── gridfs/
│           └── images/
│               ├── route.ts       # Image CRUD API
│               └── [id]/
│                   └── route.ts  # Image serving API
├── components/
│   ├── Banner.tsx                # Dynamic banner component
│   └── sections/
│       └── HeroSlider.tsx        # Home page slider
└── lib/
    ├── auth.ts                   # Authentication utilities
    ├── gridfs.ts                 # GridFS utilities
    └── mongodb.ts                # MongoDB connection
```

## Usage Examples

### Adding Banner Images
1. Go to Admin Dashboard
2. Select the target page (e.g., "Services")
3. Click "Add Banner Image"
4. Upload image file
5. Set title, description, and display order
6. Mark as active/inactive
7. Click "Upload Image"

### Managing Existing Images
- **Reorder**: Change the display order number
- **Hide/Show**: Toggle active status
- **Delete**: Remove image permanently

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Admin-only API endpoints
- Secure image serving with proper headers
- Input validation and sanitization

## Troubleshooting

### Common Issues

1. **Login Failed**
   - Verify admin user exists in database
   - Check username/password combination
   - Ensure MongoDB connection is working

2. **Image Upload Failed**
   - Check file size limits
   - Verify image format (JPG, PNG, WebP)
   - Ensure GridFS bucket is properly configured

3. **Images Not Displaying**
   - Check if images are marked as active
   - Verify page parameter matches
   - Check browser console for errors

### Database Queries

To manually check admin users:
```javascript
db.admin_users.find()
```

To check uploaded images:
```javascript
db.images.files.find()
```

## Environment Variables

Ensure these environment variables are set:
- `MONGODB_URI` - MongoDB connection string
- `MONGODB_DB` - Database name
- `JWT_SECRET` - JWT signing secret

## Support

For technical support or questions about the admin panel, please contact the development team.