// Test script to verify admin login functionality
const testAdminLogin = async () => {
  try {
    console.log('Testing admin login functionality...');
    
    // Test 1: Check if admin page loads
    console.log('\n1. Testing admin page load...');
    const pageResponse = await fetch('http://localhost:3000/admin');
    if (pageResponse.ok) {
      console.log('✅ Admin page loads successfully');
    } else {
      console.log('❌ Admin page failed to load');
      return;
    }
    
    // Test 2: Test mock login endpoint
    console.log('\n2. Testing mock login endpoint...');
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
      console.log('✅ Mock login endpoint works');
      console.log('   Token received:', loginData.data.token.substring(0, 50) + '...');
      console.log('   Admin user:', loginData.data.admin.username);
    } else {
      console.log('❌ Mock login endpoint failed');
      return;
    }
    
    // Test 3: Test dashboard access with token
    console.log('\n3. Testing dashboard access...');
    const dashboardResponse = await fetch('http://localhost:3000/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${loginData.data.token}`
      }
    });
    
    if (dashboardResponse.ok) {
      console.log('✅ Dashboard accessible with token');
    } else {
      console.log('❌ Dashboard access failed');
    }
    
    console.log('\n🎉 Admin login functionality test completed!');
    console.log('\nTo test manually:');
    console.log('1. Go to http://localhost:3000/admin');
    console.log('2. Enter username: admin');
    console.log('3. Enter password: admin123');
    console.log('4. Click Login');
    console.log('5. You should be redirected to the dashboard');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// Run the test
testAdminLogin();




