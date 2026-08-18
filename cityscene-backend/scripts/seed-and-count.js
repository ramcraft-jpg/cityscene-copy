import connectDB from '../config/db.js';
import { seedDatabase } from '../services/seedService.js';
import { Blog } from '../models/Blog.js';
import { Service } from '../models/Service.js';
import { Project } from '../models/Project.js';
import { Job } from '../models/Job.js';
import { Client } from '../models/Client.js';
import { Testimonial } from '../models/Testimonial.js';
import { HomeContent } from '../models/HomeContent.js';
import { Admin } from '../models/Admin.js';
import { Application } from '../models/Application.js';
import { Contact } from '../models/Contact.js';

export const runSeedAndCount = async () => {
  await connectDB();

  console.log('\n--- 1. FIRST SEED EXECUTION ---');
  await seedDatabase();

  console.log('\n--- 2. SECOND SEED EXECUTION (IDEMPOTENCY TEST) ---');
  await seedDatabase();

  console.log('\n--- 3. MYSQL TABLE RECORD COUNTS AUDIT ---');
  const counts = {
    blogs: await Blog.count(),
    services: await Service.count(),
    projects: await Project.count(),
    jobs: await Job.count(),
    clients: await Client.count(),
    testimonials: await Testimonial.count(),
    home_contents: await HomeContent.count(),
    admins: await Admin.count(),
    applications: await Application.count(),
    contacts: await Contact.count()
  };

  console.log('----------------------------------------------------');
  console.log('TABLE NAME          │ RECORD COUNT IN MYSQL');
  console.log('--------------------┼-------------------------------');
  Object.entries(counts).forEach(([table, count]) => {
    console.log(`${table.padEnd(20)}│ ${count} records`);
  });
  console.log('----------------------------------------------------\n');

  return counts;
};

if (process.argv[1].endsWith('seed-and-count.js')) {
  runSeedAndCount().then(() => process.exit(0)).catch(() => process.exit(1));
}
