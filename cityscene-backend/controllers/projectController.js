import { Op } from 'sequelize';
import { Project } from '../models/Project.js';
import { initialProjects } from '../services/seedService.js';
import { getClients as fetchClients } from './clientController.js';

/**
 * Ensure seed projects exist in MySQL database
 */
const ensureSeedProjects = async () => {
  try {
    const count = await Project.count();
    if (count === 0 && initialProjects && initialProjects.length > 0) {
      await Project.bulkCreate(initialProjects, { ignoreDuplicates: true });
    }
  } catch (error) {
    console.error('[Project Seed Sync Error]:', error.message);
  }
};

/**
 * @desc    Get all portfolio projects (Public / Admin)
 * @route   GET /api/projects
 * @access  Public (if all=true, returns inactive projects too for admin)
 */
export const getProjects = async (req, res, next) => {
  try {
    await ensureSeedProjects();
    const showAll = req.query.all === 'true';

    const whereClause = {};
    if (!showAll) {
      whereClause.isActive = true;
    }

    const projects = await Project.findAll({
      where: whereClause,
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single project by slug or ID
 * @route   GET /api/projects/:slug
 * @access  Public
 */
export const getProjectBySlug = async (req, res, next) => {
  try {
    await ensureSeedProjects();
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Project slug parameter is required.' });
    }

    const cleanSlug = slug.trim().toLowerCase();
    const project = await Project.findOne({
      where: {
        [Op.or]: [
          { slug: cleanSlug },
          { id: slug.trim() }
        ]
      }
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all trusted clients
 * @route   GET /api/projects/clients
 * @access  Public
 */
export const getClients = fetchClients;

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private (Admin)
 */
export const createProject = async (req, res, next) => {
  try {
    await ensureSeedProjects();
    const { title, id, slug, category, client, shortDesc, description, image } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Project title is required.' });
    }

    const projId = (id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();
    const projSlug = (slug || projId).trim().toLowerCase();

    const existingProject = await Project.findOne({
      where: {
        [Op.or]: [
          { id: projId },
          { slug: projSlug }
        ]
      }
    });

    if (existingProject) {
      return res.status(400).json({ success: false, message: `A project with ID or Slug '${projSlug}' already exists.` });
    }

    const newProject = await Project.create({
      ...req.body,
      id: projId,
      slug: projSlug,
      title: title.trim(),
      category: (category || 'AI & Smart Cities').trim(),
      client: (client || 'Enterprise Partner').trim(),
      duration: req.body.duration || '6 Months',
      image: image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      shortDesc: (shortDesc || description || 'Enterprise digital solution delivered by CityScene Global.').trim(),
      fullDesc: (req.body.fullDesc || shortDesc || description || 'Full case study details.').trim(),
      order: req.body.order || 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: newProject
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing project
 * @route   PUT /api/projects/:id
 * @access  Private (Admin)
 */
export const updateProject = async (req, res, next) => {
  try {
    await ensureSeedProjects();
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const project = await Project.findOne({
      where: {
        [Op.or]: [
          { id: cleanId },
          { slug: cleanId }
        ]
      }
    });

    if (!project) {
      return res.status(404).json({ success: false, message: `Project with ID '${id}' not found.` });
    }

    await project.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private (Admin)
 */
export const deleteProject = async (req, res, next) => {
  try {
    await ensureSeedProjects();
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const project = await Project.findOne({
      where: {
        [Op.or]: [
          { id: cleanId },
          { slug: cleanId }
        ]
      }
    });

    if (!project) {
      return res.status(404).json({ success: false, message: `Project with ID '${id}' not found.` });
    }

    await project.destroy();

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
