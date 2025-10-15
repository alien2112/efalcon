import { NextRequest, NextResponse } from 'next/server';
import { GridFSUtils } from '@/lib/gridfs';
import { withAuth } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

// Define banner images to upload
const bannerImages = [
  {
    filePath: 'public/gallery/logistic .webp',
    page: 'home',
    title: 'Logistic Services',
    description: 'Integrated logistics solutions across marine ports and inland operations',
    order: 1
  },
  {
    filePath: 'public/gallery/oil extraction.webp',
    page: 'home',
    title: 'Oil & Gas Solutions',
    description: 'Comprehensive petroleum storage, trading, and distribution solutions',
    order: 2
  },
  {
    filePath: 'public/gallery/water purification1.webp',
    page: 'home',
    title: 'Water Desalination',
    description: 'Advanced water desalination systems for clean water supply',
    order: 3
  },
  {
    filePath: 'public/about us banner .webp',
    page: 'about',
    title: 'About Us Banner',
    description: 'Learn more about Ebdaa Falcon and our mission',
    order: 1
  },
  {
    filePath: 'public/ourservicesbanner.webp',
    page: 'services',
    title: 'Our Services',
    description: 'Comprehensive energy, logistics, and sustainability solutions',
    order: 1
  },
  {
    filePath: 'public/ourworkbanner.webp',
    page: 'work',
    title: 'Our Work',
    description: 'Explore our portfolio of successful projects',
    order: 1
  },
  {
    filePath: 'public/blog banner.webp',
    page: 'blog',
    title: 'Blog Banner',
    description: 'Latest news and insights from our team',
    order: 1
  }
];

export const POST = withAuth(async (request: NextRequest) => {
  try {
    const uploadedImages = [];
    const errors = [];

    for (const image of bannerImages) {
      try {
        // Check if file exists
        if (!fs.existsSync(image.filePath)) {
          errors.push(`File not found: ${image.filePath}`);
          continue;
        }

        // Read file
        const fileBuffer = fs.readFileSync(image.filePath);
        const fileName = path.basename(image.filePath);

        // Check if image already exists
        const existingFiles = await GridFSUtils.listFiles({ filename: fileName });
        if (existingFiles.length > 0) {
          errors.push(`Image already exists: ${fileName}`);
          continue;
        }

        // Upload to GridFS
        const fileId = await GridFSUtils.uploadFile(
          fileBuffer,
          fileName,
          'image/webp',
          {
            title: image.title || fileName,
            description: image.description || '',
            order: image.order,
            isActive: true,
            page: image.page
          }
        );

        uploadedImages.push({
          fileId,
          fileName,
          page: image.page,
          title: image.title
        });

      } catch (error) {
        errors.push(`Error uploading ${image.filePath}: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        uploaded: uploadedImages,
        errors: errors
      },
      message: `Uploaded ${uploadedImages.length} images successfully`
    });

  } catch (error) {
    console.error('Error uploading banner images:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to upload banner images'
    }, { status: 500 });
  }
});
