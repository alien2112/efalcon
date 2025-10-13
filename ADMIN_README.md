# Admin Dashboard - Petro Website

This admin dashboard allows administrators to manage images for the Petro website's Vision, Services, and Work sections.

## Features

### 🔐 Authentication
- Secure login system with JWT tokens
- Password hashing with bcrypt
- Session management with localStorage

### 🖼️ Image Management
- **Vision Images**: Manage images for left and right boxes in the vision section
- **Services Images**: Manage slider images for the services carousel
- **Work Images**: Manage 4 images for the work section grid

### 📊 Admin Dashboard Features
- Tabbed interface for different image categories
- Add, edit, and delete images
- Image preview with thumbnails
- Form validation and error handling
- Real-time updates

## Setup Instructions

### 1. Database Setup
The MongoDB connection is already configured with:
- **URL**: `mongodb+srv://eslamabdaltif:petroloneone@cluster0.khjzlvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
- **Database**: `petrowebsite`

### 2. Admin User Creation
An admin user has been created with:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change the password after first login!

### 3. Environment Variables
The following environment variables are set in `.env.local`:
```
MONGODB_URI=mongodb+srv://eslamabdaltif:petroloneone@cluster0.khjzlvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB=petrowebsite
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Usage

### Accessing the Admin Dashboard
1. Navigate to `/admin` in your browser
2. Login with the admin credentials
3. Use the tabbed interface to manage different image categories

### Managing Images

#### Vision Images
- **Left Position**: Image for the left box in vision section
- **Right Position**: Image for the right box in vision section
- Only one active image per position allowed

#### Services Images
- Images appear in the services carousel slider
- Order determines the sequence (1, 2, 3, etc.)
- Multiple images can be active

#### Work Images
- Images for the 4-box work section grid
- Order must be between 1-4
- Only one active image per order position

### Image Requirements
- **Image URL**: Must be a valid URL to an image
- **Title**: Descriptive title for the image
- **Description**: Text content displayed with the image
- **Order/Position**: Determines placement in the UI

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### Vision Images
- `GET /api/admin/vision-images` - Fetch all vision images
- `POST /api/admin/vision-images` - Create new vision image (Admin only)
- `PUT /api/admin/vision-images` - Update vision image (Admin only)
- `DELETE /api/admin/vision-images?_id={id}` - Delete vision image (Admin only)

### Services Images
- `GET /api/admin/services-images` - Fetch all services images
- `POST /api/admin/services-images` - Create new service image (Admin only)
- `PUT /api/admin/services-images` - Update service image (Admin only)
- `DELETE /api/admin/services-images?_id={id}` - Delete service image (Admin only)

### Work Images
- `GET /api/admin/work-images` - Fetch all work images
- `POST /api/admin/work-images` - Create new work image (Admin only)
- `PUT /api/admin/work-images` - Update work image (Admin only)
- `DELETE /api/admin/work-images?_id={id}` - Delete work image (Admin only)

## Database Schema

### Admin Users Collection
```typescript
interface AdminUser {
  _id?: string;
  username: string;
  password: string; // hashed
  email: string;
  createdAt: Date;
  lastLogin?: Date;
}
```

### Vision Images Collection
```typescript
interface VisionImage {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  position: 'left' | 'right';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Services Images Collection
```typescript
interface ServiceImage {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Work Images Collection
```typescript
interface WorkImage {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number; // 1-4
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- Error handling and logging

## Development

### Running the Development Server
```bash
npm run dev
```

### Creating Additional Admin Users
Run the script to create additional admin users:
```bash
node scripts/create-admin.js
```

## Troubleshooting

### Common Issues
1. **Login fails**: Check username/password combination
2. **Images not loading**: Verify image URLs are accessible
3. **Database connection issues**: Check MongoDB connection string
4. **Permission errors**: Ensure admin user has proper authentication

### Support
For technical support or questions about the admin dashboard, contact the development team.
