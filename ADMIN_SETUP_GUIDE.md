# Petrowebsite Admin Setup Guide

## Overview
This guide will help you set up and use the admin panel for managing banner images across all pages of the Petrowebsite.

## Features
- **Secure Authentication**: JWT-based admin authentication
- **Banner Management**: Upload, edit, delete, and toggle visibility of banner images
- **Multi-Page Support**: Manage banners for Home, About Us, Services, Our Work, Blog, and Contact pages
- **Slider Support**: All banners support multiple images with automatic slider functionality
- **GridFS Storage**: Efficient image storage using MongoDB GridFS
- **Metadata Management**: Update titles, descriptions, order, and active status without re-uploading images

## Prerequisites
1. MongoDB Atlas connection (already configured)
2. Node.js and npm installed
3. Environment variables configured in `.env.local`

## Initial Setup

### Step 1: Create Admin User

You have two options to create an admin user:

#### Option A: Using the API Setup Endpoint (Recommended)

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to one of these options:

   **Using curl (Command Line):**
   ```bash
   curl -X POST http://localhost:3000/api/admin/setup \
     -H "Content-Type: application/json" \
     -d "{\"username\":\"admin\",\"password\":\"admin123\",\"email\":\"admin@petrowebsite.com\",\"setupKey\":\"setup-admin-2025\"}"
   ```

   **Using Postman or any API client:**
   - URL: `POST http://localhost:3000/api/admin/setup`
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "username": "admin",
       "password": "admin123",
       "email": "admin@petrowebsite.com",
       "setupKey": "setup-admin-2025"
     }
     ```

3. You should receive a success response:
   ```json
   {
     "success": true,
     "data": {
       "username": "admin",
       "email": "admin@petrowebsite.com"
     },
     "message": "Admin user created successfully"
   }
   ```

#### Option B: Using Node Script (If SSL issues persist)

If you encounter SSL/TLS errors, the API endpoint through Next.js server handles the connection properly.

### Step 2: Access Admin Panel

1. Navigate to: `http://localhost:3000/admin`

2. Login with:
   - **Username**: `admin`
   - **Password**: `admin123`

3. ⚠️ **IMPORTANT**: Change the password after first login!

## Admin Dashboard Features

### Banner Management

#### Viewing Banners
- Use the page tabs (Home, About Us, Services, Our Work, Blog, Contact) to switch between different pages
- Each page displays its own set of banner images
- View image details including title, description, order, and status

#### Adding New Banners
1. Select the page tab where you want to add a banner
2. Click "Add Banner Image"
3. Fill in the form:
   - **Image File**: Upload the banner image (JPEG, PNG, WebP recommended)
   - **Title**: Image title (will be shown as alt text)
   - **Description**: Brief description of the image
   - **Display Order**: Number determining the slider order (1 = first)
   - **Active**: Check to make the image visible on the website
4. Click "Upload Image"

#### Editing Banners
1. Find the banner you want to edit
2. Click the "Edit" button
3. Modify the title, description, order, or active status
4. Click "Save" to apply changes
5. Click "Cancel" to discard changes

#### Toggling Banner Visibility
- Click the "Hide" button to deactivate a banner (it won't show on the website)
- Click the "Show" button to activate a banner

#### Deleting Banners
1. Click the "Delete" button on any banner
2. Confirm the deletion
3. The banner will be permanently removed from GridFS

### Slider Behavior

- **Single Image**: Displays as a static banner
- **Multiple Images**: Automatically creates a slider with:
  - 5-second auto-rotation
  - Navigation arrows
  - Dot indicators at the bottom
  - Smooth transitions

Images are displayed in order based on their "Display Order" value (lowest to highest).

## Page-Specific Banner Configuration

### Home Page
- Page identifier: `home`
- Recommended dimensions: 1920x1080px
- Supports multiple images for main hero slider

### About Us Page
- Page identifier: `about`
- Recommended dimensions: 1920x800px
- Professional images showcasing company culture

### Services Page
- Page identifier: `services`
- Recommended dimensions: 1920x800px
- Images related to oil & gas and logistics services

### Our Work Page
- Page identifier: `work`
- Recommended dimensions: 1920x800px
- Project showcase images

### Blog Page
- Page identifier: `blog`
- Recommended dimensions: 1920x600px
- Editorial or industry-related images

### Contact Page
- Page identifier: `contact`
- Recommended dimensions: 1920x600px
- Office or contact-themed images

## Technical Details

### Database Structure

**Collection**: `images.files` (GridFS)

**Metadata Structure**:
```javascript
{
  title: "Banner Title",
  description: "Banner Description",
  order: 1,
  isActive: true,
  page: "home" // or "about", "services", "work", "blog", "contact"
}
```

### API Endpoints

#### Public Endpoints
- `GET /api/gridfs/images` - List all active images
- `GET /api/gridfs/images/:id` - Get specific image file

#### Admin Endpoints (Require Authentication)
- `POST /api/gridfs/images` - Upload new image
- `PUT /api/gridfs/images` - Update image metadata
- `DELETE /api/gridfs/images?_id=:id` - Delete image
- `POST /api/admin/login` - Admin login
- `POST /api/admin/setup` - Create admin user (setup only)

### Authentication
- Uses JWT tokens stored in localStorage
- Token expiration: 24 hours
- Token is sent in `Authorization: Bearer <token>` header

## Troubleshooting

### SSL/TLS Connection Errors
The MongoDB connection is configured with:
- TLS enabled
- Invalid certificate validation allowed in development
- Proper timeouts for slower connections

If you still encounter errors, ensure your MongoDB Atlas:
1. IP whitelist includes your current IP (or use 0.0.0.0/0 for development)
2. Database user has proper permissions
3. Cluster is active and accessible

### Cannot Login
1. Ensure admin user was created successfully
2. Check browser console for errors
3. Verify JWT_SECRET is set in `.env.local`
4. Clear localStorage and cookies
5. Try creating admin user again using setup endpoint

### Images Not Showing
1. Verify images are marked as "Active"
2. Check the correct page identifier is set
3. Ensure GridFS has the images (check MongoDB Atlas)
4. Check browser console for 404 errors
5. Verify the image files uploaded successfully

### Banner Not Sliding
1. Ensure multiple images exist for the same page
2. Check all images have proper order values
3. Verify all images are marked as active
4. Check browser console for JavaScript errors

## Security Best Practices

1. **Change Default Password**: Always change the default admin password after first login
2. **Secure JWT_SECRET**: Use a strong, random JWT_SECRET in production
3. **Disable Setup Endpoint**: In production, disable the `/api/admin/setup` endpoint
4. **Use HTTPS**: Always use HTTPS in production
5. **Restrict Admin Access**: Consider adding IP whitelisting for admin panel
6. **Regular Backups**: Backup your MongoDB database regularly

## Production Deployment

Before deploying to production:

1. Update `.env.local` (or production environment variables):
   ```env
   MONGODB_URI=<your-production-mongodb-uri>
   JWT_SECRET=<strong-random-secret-key>
   NODE_ENV=production
   ```

2. Disable the setup endpoint by adding authentication or removing it

3. Change all default passwords

4. Enable MongoDB Atlas network access restrictions

5. Set up proper SSL certificates

6. Configure proper CORS if needed

## Support

For issues or questions:
- Check the main README.md
- Review MongoDB Atlas logs
- Check Next.js build logs
- Contact the development team

---

**Last Updated**: 2025-01-15
**Version**: 1.0.0
