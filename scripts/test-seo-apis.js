// Using built-in fetch (Node.js 18+)

const BASE_URL = 'http://localhost:3000';

async function testSEOAPIs() {
  console.log('🧪 Testing SEO APIs...\n');

  try {
    // Test 1: Create SEO settings
    console.log('1. Creating SEO settings for home page...');
    const createResponse = await fetch(`${BASE_URL}/api/admin/seo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      },
      body: JSON.stringify({
        page: 'home',
        metaTitle: 'Ebdaa Falcon - Leading Energy Solutions',
        metaDescription: 'Ebdaa Falcon provides comprehensive energy solutions including solar panels, wind generators, and water purification systems.',
        keywords: ['energy', 'solar', 'wind', 'water purification', 'renewable energy'],
        canonicalUrl: 'https://ebdaafalcon.com',
        ogTitle: 'Ebdaa Falcon - Leading Energy Solutions',
        ogDescription: 'Discover innovative energy solutions with Ebdaa Falcon',
        ogImage: 'https://ebdaafalcon.com/images/og-image.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: 'Ebdaa Falcon - Energy Solutions',
        twitterDescription: 'Leading provider of renewable energy solutions',
        twitterImage: 'https://ebdaafalcon.com/images/twitter-image.jpg',
        robots: { index: true, follow: true }
      })
    });

    const createResult = await createResponse.json();
    console.log('✅ Create SEO settings:', createResult.success ? 'SUCCESS' : 'FAILED');
    if (!createResult.success) {
      console.log('Error:', createResult.error);
    }

    // Test 2: Get all SEO settings
    console.log('\n2. Fetching all SEO settings...');
    const getAllResponse = await fetch(`${BASE_URL}/api/admin/seo`, {
      headers: {
        'Authorization': 'Bearer test-token'
      }
    });

    const getAllResult = await getAllResponse.json();
    console.log('✅ Get all SEO settings:', getAllResult.success ? 'SUCCESS' : 'FAILED');
    if (getAllResult.success) {
      console.log(`Found ${getAllResult.data.length} SEO settings`);
    }

    // Test 3: Get SEO settings for specific page
    console.log('\n3. Fetching SEO settings for home page...');
    const getPageResponse = await fetch(`${BASE_URL}/api/seo/home`);
    const getPageResult = await getPageResponse.json();
    console.log('✅ Get page SEO settings:', getPageResult.success ? 'SUCCESS' : 'FAILED');
    if (getPageResult.success) {
      console.log('Page SEO data:', getPageResult.data.page);
    }

    // Test 4: Update SEO settings
    if (createResult.success && createResult.data._id) {
      console.log('\n4. Updating SEO settings...');
      const updateResponse = await fetch(`${BASE_URL}/api/admin/seo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify({
          _id: createResult.data._id,
          metaTitle: 'Ebdaa Falcon - Premier Energy Solutions Provider',
          metaDescription: 'Leading provider of innovative energy solutions including solar panels, wind generators, and advanced water purification systems.',
          keywords: ['energy solutions', 'solar panels', 'wind generators', 'water purification', 'renewable energy', 'sustainability']
        })
      });

      const updateResult = await updateResponse.json();
      console.log('✅ Update SEO settings:', updateResult.success ? 'SUCCESS' : 'FAILED');
      if (!updateResult.success) {
        console.log('Error:', updateResult.error);
      }
    }

    // Test 5: Delete SEO settings
    if (createResult.success && createResult.data._id) {
      console.log('\n5. Deleting SEO settings...');
      const deleteResponse = await fetch(`${BASE_URL}/api/admin/seo?id=${createResult.data._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer test-token'
        }
      });

      const deleteResult = await deleteResponse.json();
      console.log('✅ Delete SEO settings:', deleteResult.success ? 'SUCCESS' : 'FAILED');
      if (!deleteResult.success) {
        console.log('Error:', deleteResult.error);
      }
    }

    console.log('\n🎉 SEO API tests completed!');

  } catch (error) {
    console.error('❌ Error testing SEO APIs:', error.message);
  }
}

testSEOAPIs();
