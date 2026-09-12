const API_BASE = 'http://localhost:5000/api/seo';

async function testSeoApi() {
  console.log('🧪 Testing SEO API Endpoints...');

  try {
    // 1. Get All SEO Records
    const resAll = await fetch(API_BASE);
    const jsonAll = await resAll.json();
    console.log(`\n1. GET /api/seo -> Status: ${resAll.status}, Count: ${jsonAll.count}`);
    if (jsonAll.data && jsonAll.data.length > 0) {
      console.log('   Sample Page Keys:', jsonAll.data.map(p => p.pageKey).slice(0, 5));
    } else {
      console.error('   ❌ No SEO records returned!');
    }

    // 2. Get Single Page SEO (Home)
    const resHome = await fetch(`${API_BASE}/home`);
    const jsonHome = await resHome.json();
    console.log(`\n2. GET /api/seo/home -> Status: ${resHome.status}`);
    if (jsonHome.success && jsonHome.data) {
      console.log('   Title:', jsonHome.data.title);
      console.log('   Description:', jsonHome.data.description);
      console.log('   H1 Tag:', jsonHome.data.h1Tag);
    } else {
      console.error('   ❌ Failed to retrieve Home SEO record!');
    }

    console.log('\n✅ SEO API Tests Completed Successfully!');
  } catch (error) {
    console.error('❌ SEO API Test Error:', error.message);
  }
}

testSeoApi();
