import { SeoMeta } from '../models/SeoMeta.js';

async function testH1Persistence() {
  console.log('🧪 Testing H1 Tag DB Persistence...');
  try {
    await SeoMeta.sync({ alter: true });
    // 1. Fetch existing home record directly via model
    let record = await SeoMeta.findOne({ where: { pageKey: 'home' } });
    console.log('\nInitial DB Record for home:');
    console.log('  pageKey:', record?.pageKey);
    console.log('  h1Tag:', record?.h1Tag);

    // 2. Update h1Tag
    const testH1 = "Engineering Tomorrow's Enterprise Software & AI Solutions";
    if (record) {
      await record.update({ h1Tag: testH1 });
      console.log('\nUpdated DB Record h1Tag to:', testH1);
    } else {
      record = await SeoMeta.create({
        pageKey: 'home',
        pageName: 'Home Page',
        pageGroup: 'main',
        h1Tag: testH1
      });
      console.log('\nCreated DB Record h1Tag:', testH1);
    }

    // 3. Re-query from DB to verify persistence
    const reQueried = await SeoMeta.findOne({ where: { pageKey: 'home' } });
    console.log('\nRe-queried DB Record for home:');
    console.log('  pageKey:', reQueried?.pageKey);
    console.log('  h1Tag:', reQueried?.h1Tag);

    if (reQueried && reQueried.h1Tag === testH1) {
      console.log('\n✅ PASS: H1 Tag persisted successfully to MySQL database!');
    } else {
      console.error('\n❌ FAIL: H1 Tag failed to persist correctly!');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Test Error:', err);
    process.exit(1);
  }
}

testH1Persistence();
