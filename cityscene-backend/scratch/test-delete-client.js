async function testDeleteClient() {
  try {
    const getRes = await fetch('http://localhost:5000/api/clients');
    const getJson = await getRes.json();
    console.log('Current Clients count:', getJson.count);

    if (getJson.data && getJson.data.length > 0) {
      const target = getJson.data[getJson.data.length - 1];
      console.log('Testing delete for client:', target.id);

      const delRes = await fetch(`http://localhost:5000/api/clients/${encodeURIComponent(target.id)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer admin-session-token'
        }
      });
      const delJson = await delRes.json();
      console.log('Delete Result status:', delRes.status, 'Response:', delJson);
    }
  } catch (err) {
    console.error('Test error:', err);
  }
}

testDeleteClient();
