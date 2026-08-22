const testLogin = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admincityscene@gmail.com',
        password: 'Admin@cityscene2025'
      })
    });

    const data = await res.json();
    console.log('Login Test Result Status:', res.status);
    console.log('Login Response:', JSON.stringify(data, null, 2));

    if (res.ok && data.success && data.token) {
      console.log('✅ Authentication test passed successfully!');
      process.exit(0);
    } else {
      console.error('❌ Authentication test failed!');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error during testLogin:', error);
    process.exit(1);
  }
};

testLogin();
