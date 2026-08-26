const API_BASE = 'http://localhost:5000/api';

const endpoints = [
  '/services?all=true',
  '/blogs?all=true',
  '/projects?all=true',
  '/jobs?all=true',
  '/testimonials',
  '/contact',
  '/applications',
  '/home-content',
  '/clients',
  '/seo'
];

async function testAllAdminEndpoints() {
  console.log('=== ADMIN PORTAL ENDPOINT AUDIT ===\n');
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`);
      const data = await res.json();
      const count = Array.isArray(data.data) ? data.data.length : (data.count || Object.keys(data.data || {}).length);
      console.log(`✅ [${res.status}] GET ${endpoint.padEnd(25)} -> Count / Size: ${count} records`);
    } catch (err) {
      console.error(`❌ GET ${endpoint} failed:`, err.message);
    }
  }
}

testAllAdminEndpoints();
