import { Service } from '../models/Service.js';
import { initialServices } from '../services/seedService.js';
import { sequelize } from '../config/db.js';

async function forceReseedServices() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Syncing Service database schema with alter: true...');
    await Service.sync({ alter: true });
    console.log('Database schema synchronized. Updating all services with independent media fields...');

    for (const srvData of initialServices) {
      const targetId = srvData.id;
      
      const existing = await Service.findOne({
        where: { id: targetId }
      });

      const cardImg = srvData.cardImage || srvData.image;
      const heroImg = srvData.heroImage || srvData.image;
      const contentImg = srvData.contentImage || heroImg;
      const whyChooseBg = srvData.whyChooseUsBackgroundImage || srvData.whyChooseImage || srvData.backgroundImage || heroImg;

      const payload = {
        ...srvData,
        cardImage: cardImg,
        image: cardImg,
        heroImage: heroImg,
        contentImage: contentImg,
        whyChooseUsBackgroundImage: whyChooseBg,
        whyChooseImage: whyChooseBg
      };

      if (existing) {
        console.log(`Updating service: ${targetId} (${srvData.displayTitle || srvData.title})...`);
        // preserve custom non-empty images if previously customized by user
        const updatePayload = {
          ...payload,
          cardImage: existing.cardImage || cardImg,
          image: existing.cardImage || existing.image || cardImg,
          heroImage: existing.heroImage || heroImg,
          contentImage: existing.contentImage || existing.heroImage || contentImg,
          whyChooseUsBackgroundImage: existing.whyChooseUsBackgroundImage || existing.whyChooseImage || whyChooseBg
        };
        await existing.update(updatePayload);
      } else {
        console.log(`Creating service: ${targetId} (${srvData.displayTitle || srvData.title})...`);
        await Service.create(payload);
      }
    }

    console.log('✅ ALL SERVICES UPDATED IN DATABASE SUCCESSFULLY WITH SEPARATED MEDIA FIELDS!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database reseed error:', err);
    process.exit(1);
  }
}

forceReseedServices();
