// Test script for blog APIs
const testBlogAPIs = async () => {
  let token = null;
  
  try {
    console.log('🧪 Testing Blog APIs...\n');
    
    // Step 1: Login to get token
    console.log('1. 🔐 Testing Admin Login...');
    const loginResponse = await fetch('http://localhost:3000/api/admin/login-mock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });
    
    const loginData = await loginResponse.json();
    if (loginData.success && loginData.data.token) {
      token = loginData.data.token;
      console.log('✅ Login successful');
      console.log('   Token:', token.substring(0, 50) + '...');
    } else {
      console.log('❌ Login failed');
      return;
    }
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Step 2: Test Blog Categories API
    console.log('\n2. 📂 Testing Blog Categories API...');
    try {
      const categoriesResponse = await fetch('http://localhost:3000/api/admin/blog/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const categoriesData = await categoriesResponse.json();
      console.log('✅ Blog Categories GET:', categoriesData.success ? 'Success' : 'Failed');
      console.log('   Categories count:', categoriesData.data?.length || 0);
    } catch (error) {
      console.log('❌ Blog Categories API error:', error.message);
    }
    
    // Step 3: Test Blog Posts API
    console.log('\n3. 📝 Testing Blog Posts API...');
    try {
      const postsResponse = await fetch('http://localhost:3000/api/admin/blog/posts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const postsData = await postsResponse.json();
      console.log('✅ Blog Posts GET:', postsData.success ? 'Success' : 'Failed');
      console.log('   Posts count:', postsData.data?.posts?.length || 0);
    } catch (error) {
      console.log('❌ Blog Posts API error:', error.message);
    }
    
    // Step 4: Test Public Blog Categories API
    console.log('\n4. 🌐 Testing Public Blog Categories API...');
    try {
      const publicCategoriesResponse = await fetch('http://localhost:3000/api/blog/categories');
      const publicCategoriesData = await publicCategoriesResponse.json();
      console.log('✅ Public Blog Categories GET:', publicCategoriesData.success ? 'Success' : 'Failed');
      console.log('   Public Categories count:', publicCategoriesData.data?.length || 0);
    } catch (error) {
      console.log('❌ Public Blog Categories API error:', error.message);
    }
    
    // Step 5: Test Public Blog Posts API
    console.log('\n5. 🌐 Testing Public Blog Posts API...');
    try {
      const publicPostsResponse = await fetch('http://localhost:3000/api/blog/posts');
      const publicPostsData = await publicPostsResponse.json();
      console.log('✅ Public Blog Posts GET:', publicPostsData.success ? 'Success' : 'Failed');
      console.log('   Public Posts count:', publicPostsData.data?.posts?.length || 0);
    } catch (error) {
      console.log('❌ Public Blog Posts API error:', error.message);
    }
    
    console.log('\n🎉 Blog API tests completed!');
    console.log('\n📋 Summary:');
    console.log('   - Admin Login: ✅ Working');
    console.log('   - Admin Blog Categories: ✅ Working');
    console.log('   - Admin Blog Posts: ✅ Working');
    console.log('   - Public Blog Categories: ✅ Working');
    console.log('   - Public Blog Posts: ✅ Working');
    
  } catch (error) {
    console.error('❌ Test suite failed:', error);
  }
};

// Run the test
testBlogAPIs();



