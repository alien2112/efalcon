const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = './public';
const OUTPUT_DIR = './public';
const QUALITY = 85; // WebP quality (0-100)
const MAX_WIDTH = 1920; // Maximum width for optimization

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

// Function to convert image to WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    const stats = await fs.promises.stat(inputPath);
    const originalSize = stats.size;
    
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const newStats = await fs.promises.stat(outputPath);
    const newSize = newStats.size;
    const compressionRatio = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    console.log(`   Size: ${(originalSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB (${compressionRatio}% reduction)`);
    
    return { success: true, originalSize, newSize, compressionRatio };
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Function to recursively find images
async function findImages(dir) {
  const images = [];
  
  try {
    const items = await fs.promises.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        // Recursively search subdirectories
        const subImages = await findImages(fullPath);
        images.push(...subImages);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (SUPPORTED_FORMATS.includes(ext)) {
          images.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return images;
}

// Main conversion function
async function convertImages() {
  console.log('🚀 Starting image conversion to WebP format...\n');
  
  // Find all images
  const images = await findImages(INPUT_DIR);
  
  if (images.length === 0) {
    console.log('No images found to convert.');
    return;
  }
  
  console.log(`Found ${images.length} images to convert:\n`);
  
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let successCount = 0;
  let failCount = 0;
  
  // Convert each image
  for (const imagePath of images) {
    const ext = path.extname(imagePath);
    const nameWithoutExt = path.basename(imagePath, ext);
    const dir = path.dirname(imagePath);
    const webpPath = path.join(dir, `${nameWithoutExt}.webp`);
    
    // Skip if WebP already exists
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Skipping: ${path.basename(imagePath)} (WebP already exists)`);
      continue;
    }
    
    const result = await convertToWebP(imagePath, webpPath);
    
    if (result.success) {
      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;
      successCount++;
    } else {
      failCount++;
    }
    
    console.log(''); // Empty line for readability
  }
  
  // Summary
  console.log('📊 Conversion Summary:');
  console.log(`✅ Successfully converted: ${successCount} images`);
  console.log(`❌ Failed conversions: ${failCount} images`);
  console.log(`📦 Total size reduction: ${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)}MB`);
  console.log(`💾 Space saved: ${(((totalOriginalSize - totalNewSize) / totalOriginalSize) * 100).toFixed(1)}%`);
  
  if (successCount > 0) {
    console.log('\n🎉 Image conversion completed!');
    console.log('💡 Next steps:');
    console.log('   1. Update your code to use .webp extensions');
    console.log('   2. Test the website to ensure images load correctly');
    console.log('   3. Consider removing original images after testing');
  }
}

// Run the conversion
convertImages().catch(console.error);
