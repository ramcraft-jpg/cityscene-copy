import { updateSeoMeta, getSeoMetaByPageKey } from '../controllers/seoMetaController.js';
import { SeoMeta } from '../models/SeoMeta.js';

async function testControllerH1() {
  console.log('🧪 Testing seoMetaController update & fetch logic...');
  try {
    await SeoMeta.sync({ alter: true });

    // Mock request and response objects
    const reqUpdate = {
      params: { pageKey: 'home' },
      body: {
        pageName: 'Home Page',
        pageGroup: 'main',
        title: 'CityScene Global - Enterprise Software & AI Solutions',
        description: 'Leading AI-driven digital transformation.',
        h1Tag: 'Enterprise AI & Custom Software Engineering Solutions'
      }
    };

    let updateResData = null;
    const resUpdate = {
      status: (code) => ({
        json: (data) => {
          updateResData = { code, data };
          return data;
        }
      })
    };

    await updateSeoMeta(reqUpdate, resUpdate, (err) => console.error(err));

    console.log('\nController Update Response status:', updateResData?.code);
    console.log('Saved Record h1Tag:', updateResData?.data?.data?.h1Tag);

    // Test GET controller
    const reqGet = { params: { pageKey: 'home' } };
    let getResData = null;
    const resGet = {
      status: (code) => ({
        json: (data) => {
          getResData = { code, data };
          return data;
        }
      })
    };

    await getSeoMetaByPageKey(reqGet, resGet, (err) => console.error(err));

    console.log('\nController GET Response status:', getResData?.code);
    console.log('Fetched Record h1Tag:', getResData?.data?.data?.h1Tag);

    if (getResData?.data?.data?.h1Tag === 'Enterprise AI & Custom Software Engineering Solutions') {
      console.log('\n✅ PASS: Controller correctly updates and fetches h1Tag!');
    } else {
      console.error('\n❌ FAIL: Controller did not return expected h1Tag!');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

testControllerH1();
