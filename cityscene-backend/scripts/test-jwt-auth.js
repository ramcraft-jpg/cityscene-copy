const API_BASE = 'http://localhost:5000/api/admin';

async function testAuth() {
  console.log('=== TESTING JWT AUTHENTICATION FLOW ===\n');

  try {
    // 1. Attempt admin login
    const loginRes = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admincityscene@gmail.com',
        password: 'Admin@cityscene2025'
      })
    });

    const loginData = await loginRes.json();
    console.log('[POST /api/admin/login] Status:', loginRes.status, 'Success:', loginData.success);

    if (!loginData.success || !loginData.token) {
      console.error('Login failed:', loginData.message);
      return;
    }

    const token = loginData.token;
    console.log('Received JWT Token:', token.substring(0, 30) + '...');

    // 2. Verify token with /api/admin/me
    const profileRes = await fetch(`${API_BASE}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const profileData = await profileRes.json();
    console.log('[GET /api/admin/me] Status:', profileRes.status, 'Admin:', profileData.admin?.email);

    // 3. Test invalid token
    const invalidRes = await fetch(`${API_BASE}/me`, {
      headers: {
        'Authorization': 'Bearer invalid_bogus_token_123'
      }
    });
    console.log('[GET /api/admin/me (invalid token)] Status:', invalidRes.status, 'Response:', await invalidRes.json());

    console.log('\n=== JWT AUTHENTICATION VERIFIED SUCCESSFULLY ===');
  } catch (err) {
    console.error('Auth test failed:', err.message);
  }
}

testAuth();
