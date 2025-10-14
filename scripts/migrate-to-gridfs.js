import fs from 'fs';
import path from 'path';
import { GridFSUtils } from '../src/lib/gridfs';

// Define the images to upload with their metadata
const imagesToUpload = [
  // Services images
  {
    filename: 'oil-extraction.webp',
    path: 'public/gallery/oil extraction.webp',
    metadata: {
      title: 'Petroleum Storage & Trading',
      description: 'Comprehensive storage solutions and strategic trading of petroleum products',
      order: 1,
      isActive: true
    }
  },
  {
    filename: 'logistic.webp',
    path: 'public/gallery/logistic .webp',
    metadata: {
      title: 'Logistics Solutions',
      description: 'Integrated logistics across marine ports and inland operations',
      order: 2,
      isActive: true
    }
  },
  {
    filename: 'solar-panels.webp',
    path: 'public/gallery/solar panels.webp',
    metadata: {
      title: 'International Partnerships',
      description: 'Representing global partners with world-class service standards',
      order: 3,
      isActive: true
    }
  },
  // Work images
  {
    filename: 'oil-extraction-work.webp',
    path: 'public/gallery/oil extraction.webp',
    metadata: {
      title: 'Petroleum Products Storage',
      description: 'State-of-the-art facilities for safe and efficient petroleum storage',
      order: 1,
      isActive: true
    }
  },
  {
    filename: 'logistic-work.webp',
    path: 'public/gallery/logistic .webp',
    metadata: {
      title: 'Marine Port Operations',
      description: 'Comprehensive port logistics and handling services',
      order: 2,
      isActive: true
    }
  },
  {
    filename: 'electric-work.webp',
    path: 'public/gallery/electric.webp',
    metadata: {
      title: 'Inland Transportation',
      description: 'Reliable inland logistics and distribution networks',
      order: 3,
      isActive: true
    }
  },
  {
    filename: 'wind-generators-work.webp',
    path: 'public/gallery/wind genrators.webp',
    metadata: {
      title: 'Trading Solutions',
      description: 'Strategic petroleum products trading and market solutions',
      order: 4,
      isActive: true
    }
  }
];

async function migrateImagesToGridFS() {
  console.log('Starting image migration to GridFS...');
  
  let successCount = 0;
  let errorCount = 0;

  for (const image of imagesToUpload) {
    try {
      // Check if file exists
      if (!fs.existsSync(image.path)) {
        console.log(`⚠️  File not found: ${image.path}`);
        errorCount++;
        continue;
      }

      // Read file
      const fileBuffer = fs.readFileSync(image.path);
      
      // Upload to GridFS
      const fileId = await GridFSUtils.uploadFile(
        fileBuffer,
        image.filename,
        'image/webp',
        image.metadata
      );

      console.log(`✅ Uploaded: ${image.filename} (ID: ${fileId})`);
      successCount++;

    } catch (error) {
      console.error(`❌ Error uploading ${image.filename}:`, error);
      errorCount++;
    }
  }

  console.log(`\n📊 Migration complete:`);
  console.log(`✅ Successfully uploaded: ${successCount} images`);
  console.log(`❌ Failed uploads: ${errorCount} images`);
}

// Run the migration
migrateImagesToGridFS()
  .then(() => {
    console.log('Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
