import connectDB, { sequelize } from '../config/db.js';
import { Admin } from '../models/Admin.js';
import bcrypt from 'bcryptjs';

const syncAdmin = async () => {
  try {
    await connectDB();

    // Check all admins
    const admins = await Admin.findAll();
    console.log('Current Admins in DB:', admins.map(a => ({ id: a.id, email: a.email, name: a.name })));

    const targetEmail = 'admincityscene@gmail.com';
    const targetPassword = 'Admin@cityscene2025';
    const hashedPassword = await bcrypt.hash(targetPassword, 10);

    // Update existing sriramdasuanisetty or admin@cityscene or create admincityscene@gmail.com
    let targetAdmin = await Admin.findOne({ where: { email: targetEmail } });

    if (!targetAdmin) {
      // Find any old admin record if present
      const oldAdmin = await Admin.findOne();
      if (oldAdmin) {
        console.log(`Updating existing admin ID ${oldAdmin.id} from ${oldAdmin.email} to ${targetEmail}`);
        oldAdmin.email = targetEmail;
        oldAdmin.password = hashedPassword;
        oldAdmin.name = 'Admin CityScene';
        oldAdmin.isActive = true;
        await oldAdmin.save();
        console.log('✅ Admin updated successfully!');
      } else {
        console.log(`Creating new admin record for ${targetEmail}`);
        await Admin.create({
          name: 'Admin CityScene',
          email: targetEmail,
          password: hashedPassword,
          role: 'admin',
          isActive: true
        });
        console.log('✅ Admin created successfully!');
      }
    } else {
      console.log(`Updating password for existing ${targetEmail}`);
      targetAdmin.password = hashedPassword;
      targetAdmin.isActive = true;
      await targetAdmin.save();
      console.log('✅ Admin password updated successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error syncing admin:', error);
    process.exit(1);
  }
};

syncAdmin();
