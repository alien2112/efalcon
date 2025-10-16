// Using built-in fetch (Node.js 18+)

const BASE_URL = 'http://localhost:3000';

async function testInternalLinksAPIs() {
  console.log('🧪 Testing Internal Links APIs...\n');

  try {
    // Test 1: Create internal link
    console.log('1. Creating internal link...');
    const createResponse = await fetch(`${BASE_URL}/api/admin/internal-links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      },
      body: JSON.stringify({
        sourcePage: 'home',
        sourceElement: 'hero-section',
        targetPage: 'services',
        targetElement: 'services-list',
        linkText: {
          en: 'View Our Services',
          ar: 'عرض خدماتنا'
        },
        linkUrl: '/services',
        linkType: 'internal',
        position: { x: 100, y: 200 },
        isActive: true,
        priority: 1,
        description: {
          en: 'Link from home page hero to services page',
          ar: 'رابط من الصفحة الرئيسية إلى صفحة الخدمات'
        }
      })
    });

    const createResult = await createResponse.json();
    console.log('✅ Create internal link:', createResult.success ? 'SUCCESS' : 'FAILED');
    if (!createResult.success) {
      console.log('Error:', createResult.error);
    }

    // Test 2: Get all internal links
    console.log('\n2. Fetching all internal links...');
    const getAllResponse = await fetch(`${BASE_URL}/api/admin/internal-links`, {
      headers: {
        'Authorization': 'Bearer test-token'
      }
    });

    const getAllResult = await getAllResponse.json();
    console.log('✅ Get all internal links:', getAllResult.success ? 'SUCCESS' : 'FAILED');
    if (getAllResult.success) {
      console.log(`Found ${getAllResult.data.length} internal links`);
    }

    // Test 3: Get internal links for specific page
    console.log('\n3. Fetching internal links for home page...');
    const getPageResponse = await fetch(`${BASE_URL}/api/internal-links/home`);
    const getPageResult = await getPageResponse.json();
    console.log('✅ Get page internal links:', getPageResult.success ? 'SUCCESS' : 'FAILED');
    if (getPageResult.success) {
      console.log(`Found ${getPageResult.data.length} links for home page`);
    }

    // Test 4: Create link category
    console.log('\n4. Creating link category...');
    const createCategoryResponse = await fetch(`${BASE_URL}/api/admin/link-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      },
      body: JSON.stringify({
        name: {
          en: 'Navigation Links',
          ar: 'روابط التنقل'
        },
        description: {
          en: 'Main navigation links',
          ar: 'روابط التنقل الرئيسية'
        },
        color: '#3B82F6',
        isActive: true
      })
    });

    const createCategoryResult = await createCategoryResponse.json();
    console.log('✅ Create link category:', createCategoryResult.success ? 'SUCCESS' : 'FAILED');
    if (!createCategoryResult.success) {
      console.log('Error:', createCategoryResult.error);
    }

    // Test 5: Update internal link
    if (createResult.success && createResult.data._id) {
      console.log('\n5. Updating internal link...');
      const updateResponse = await fetch(`${BASE_URL}/api/admin/internal-links`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify({
          _id: createResult.data._id,
          linkText: {
            en: 'Explore Our Services',
            ar: 'استكشف خدماتنا'
          },
          priority: 2
        })
      });

      const updateResult = await updateResponse.json();
      console.log('✅ Update internal link:', updateResult.success ? 'SUCCESS' : 'FAILED');
      if (!updateResult.success) {
        console.log('Error:', updateResult.error);
      }
    }

    // Test 6: Delete internal link
    if (createResult.success && createResult.data._id) {
      console.log('\n6. Deleting internal link...');
      const deleteResponse = await fetch(`${BASE_URL}/api/admin/internal-links?id=${createResult.data._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer test-token'
        }
      });

      const deleteResult = await deleteResponse.json();
      console.log('✅ Delete internal link:', deleteResult.success ? 'SUCCESS' : 'FAILED');
      if (!deleteResult.success) {
        console.log('Error:', deleteResult.error);
      }
    }

    // Test 7: Delete link category
    if (createCategoryResult.success && createCategoryResult.data._id) {
      console.log('\n7. Deleting link category...');
      const deleteCategoryResponse = await fetch(`${BASE_URL}/api/admin/link-categories?id=${createCategoryResult.data._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer test-token'
        }
      });

      const deleteCategoryResult = await deleteCategoryResponse.json();
      console.log('✅ Delete link category:', deleteCategoryResult.success ? 'SUCCESS' : 'FAILED');
      if (!deleteCategoryResult.success) {
        console.log('Error:', deleteCategoryResult.error);
      }
    }

    console.log('\n🎉 Internal Links API tests completed!');

  } catch (error) {
    console.error('❌ Error testing Internal Links APIs:', error.message);
  }
}

testInternalLinksAPIs();




