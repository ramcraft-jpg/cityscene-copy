async function testClientsAPIs() {
  try {
    console.log('Testing GET http://localhost:5000/api/clients...');
    const clientsRes = await fetch('http://localhost:5000/api/clients');
    const clientsData = await clientsRes.json();
    console.log('Clients Status:', clientsRes.status, 'Count:', clientsData.count, 'Data:', clientsData.data);

    console.log('\nTesting GET http://localhost:5000/api/home-content/portfolio-clients...');
    const headerRes = await fetch('http://localhost:5000/api/home-content/portfolio-clients');
    const headerData = await headerRes.json();
    console.log('Header Status:', headerRes.status, 'Content:', headerData.content);

    console.log('\n✅ Client APIs tests completed successfully!');
  } catch (err) {
    console.error('API Test Error:', err);
  }
}

testClientsAPIs();
