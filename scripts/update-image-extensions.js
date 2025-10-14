const fs = require('fs');
const path = require('path');

// Function to recursively find and update files
async function updateImageExtensions(dir) {
  try {
    const items = await fs.promises.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
        // Recursively search subdirectories
        await updateImageExtensions(fullPath);
      } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.ts'))) {
        // Update TypeScript/React files
        await updateFileImages(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
}

// Function to update image extensions in a single file
async function updateFileImages(filePath) {
  try {
    let content = await fs.promises.readFile(filePath, 'utf8');
    let hasChanges = false;
    
    // Replace image extensions
    const replacements = [
      // Gallery images
      { from: /\/gallery\/([^"']+)\.jpg/g, to: '/gallery/$1.webp' },
      { from: /\/gallery\/([^"']+)\.png/g, to: '/gallery/$1.webp' },
      
      // Images directory
      { from: /\/images\/([^"']+)\.png/g, to: '/images/$1.webp' },
      
      // Root directory images
      { from: /"\/about%20us%20banner%20\.jpg"/g, to: '"/about%20us%20banner%20.webp"' },
      { from: /"\/blog%20banner\.jpg"/g, to: '"/blog%20banner.webp"' },
      { from: /"\/ourworkbanner\.jpg"/g, to: '"/ourworkbanner.webp"' },
      { from: /"\/ourservicesbanner\.png"/g, to: '"/ourservicesbanner.webp"' },
      { from: /"\/logofirstsection\.png"/g, to: '"/logofirstsection.webp"' },
      { from: /"\/vision\.png"/g, to: '"/vision.webp"' },
      { from: /"\/vision2\.png"/g, to: '"/vision2.webp"' },
      { from: /"\/Rectangle 43\.png"/g, to: '"/Rectangle 43.webp"' },
      
      // Background image props
      { from: /backgroundImage="\/about%20us%20banner%20\.jpg"/g, to: 'backgroundImage="/about%20us%20banner%20.webp"' },
      { from: /backgroundImage="\/ourworkbanner\.jpg"/g, to: 'backgroundImage="/ourworkbanner.webp"' },
      { from: /backgroundImage="\/ourservicesbanner\.png"/g, to: 'backgroundImage="/ourservicesbanner.webp"' },
    ];
    
    for (const replacement of replacements) {
      const newContent = content.replace(replacement.from, replacement.to);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      await fs.promises.writeFile(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('🚀 Starting automatic image extension updates...\n');
  
  await updateImageExtensions('./src');
  
  console.log('\n🎉 Image extension updates completed!');
  console.log('💡 All .jpg and .png references have been updated to .webp');
}

// Run the update
main().catch(console.error);
