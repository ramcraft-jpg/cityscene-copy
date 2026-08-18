import { sequelize } from '../config/db.js';
import Admin from './Admin.js';
import Application from './Application.js';
import Blog from './Blog.js';
import Client from './Client.js';
import Contact from './Contact.js';
import HomeContent from './HomeContent.js';
import Job from './Job.js';
import Project from './Project.js';
import Service from './Service.js';
import Testimonial from './Testimonial.js';

// --- Associations ---

// Application <-> Job
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });
Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });

// Project <-> Client
Project.belongsTo(Client, { foreignKey: 'clientId', as: 'clientDetails' });
Client.hasMany(Project, { foreignKey: 'clientId', as: 'projects' });

export {
  sequelize,
  Admin,
  Application,
  Blog,
  Client,
  Contact,
  HomeContent,
  Job,
  Project,
  Service,
  Testimonial
};

export default {
  sequelize,
  Admin,
  Application,
  Blog,
  Client,
  Contact,
  HomeContent,
  Job,
  Project,
  Service,
  Testimonial
};
