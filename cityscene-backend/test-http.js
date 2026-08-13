const testEndpoints = async () => {
  console.log('=== TESTING EXPRESS BACKEND HTTP API ENDPOINTS ===\n');

  try {
    // 1. Health check
    const healthRes = await fetch('http://localhost:5000/api/health');
    console.log('[GET /api/health] Status:', healthRes.status, await healthRes.json());

    // 2. Services API
    const servicesRes = await fetch('http://localhost:5000/api/services');
    const servicesData = await servicesRes.json();
    console.log('[GET /api/services] Status:', servicesRes.status, `Count: ${servicesData.count}`);

    const singleServiceRes = await fetch('http://localhost:5000/api/services/mobile-app-development');
    const singleServiceData = await singleServiceRes.json();
    console.log('[GET /api/services/mobile-app-development] Status:', singleServiceRes.status, `Title: "${singleServiceData.data?.displayTitle}"`);

    // 3. Blogs API
    const blogsRes = await fetch('http://localhost:5000/api/blogs');
    const blogsData = await blogsRes.json();
    console.log('[GET /api/blogs] Status:', blogsRes.status, `Count: ${blogsData.count}`);

    const singleBlogRes = await fetch('http://localhost:5000/api/blogs/how-to-leverage-artificial-intelligence-to-grow-your-business');
    const singleBlogData = await singleBlogRes.json();
    console.log('[GET /api/blogs/:slug] Status:', singleBlogRes.status, `Title: "${singleBlogData.data?.title}"`);

    // 4. Contact POST API
    const contactRes = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Real API Tester',
        email: 'api.tester@cityscene.com',
        phone: '+1 987-654-3210',
        message: 'Submitting real contact form via HTTP POST to Express & MongoDB.'
      })
    });
    const contactData = await contactRes.json();
    console.log('[POST /api/contact] Status:', contactRes.status, contactData);

    console.log('\n=== ALL HTTP API ENDPOINT TESTS COMPLETED SUCCESSFULLY ===');
    process.exit(0);
  } catch (err) {
    console.error('[HTTP Test ERROR]:', err);
    process.exit(1);
  }
};

testEndpoints();
