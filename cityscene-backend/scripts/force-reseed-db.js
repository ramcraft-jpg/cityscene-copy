import { Project } from '../models/Project.js';
import { initialProjects } from '../services/seedService.js';
import { sequelize } from '../config/db.js';

async function forceReseedProjects() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connected. Updating all project records with unique data...');

    for (const projData of initialProjects) {
      const targetId = projData.id || projData.slug;
      
      const existing = await Project.findOne({
        where: { id: targetId }
      });

      if (existing) {
        console.log(`Updating project: ${targetId} (${projData.title})...`);
        await existing.update(projData);
      } else {
        console.log(`Creating new project: ${targetId} (${projData.title})...`);
        await Project.create(projData);
      }
    }

    console.log('✅ ALL 7 PROJECTS UPDATED IN DATABASE SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database update error:', err);
    process.exit(1);
  }
}

forceReseedProjects();
