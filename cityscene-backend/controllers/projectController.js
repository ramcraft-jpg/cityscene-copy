import Project from '../models/Project.js';
import Client from '../models/Client.js';
import { initialProjects, initialClients } from '../services/seedService.js';

/**
 * @desc    Get all portfolio projects (Public / Admin)
 * @route   GET /api/projects
 * @access  Public (if all=true, returns inactive projects too for admin)
 */
export const getProjects = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: { $ne: false } };
    let projects = await Project.find(filter).sort({ order: 1, createdAt: 1 });

    if (!projects || projects.length === 0) {
      projects = initialProjects;
    }

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
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Project slug parameter is required.' });
    }

    const cleanSlug = slug.trim().toLowerCase();
    let project = await Project.findOne({
      $or: [
        { slug: cleanSlug },
        { id: slug },
        { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }
      ]
    });

    if (!project) {
      project = initialProjects.find(
        (p) => p.slug.toLowerCase() === cleanSlug || p.id === slug
      );
    }

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
export const getClients = async (req, res, next) => {
  try {
    let clients = await Client.find({});
    if (!clients || clients.length === 0) {
      clients = initialClients;
    }

    return res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private (Admin)
 */
export const createProject = async (req, res, next) => {
  try {
    const { title, id, slug, category, client, shortDesc, description, image } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Project title is required.' });
    }

    const projId = (id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();
    const projSlug = (slug || projId).trim().toLowerCase();

    const existingProject = await Project.findOne({ $or: [{ id: projId }, { slug: projSlug }] });
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
      fullDesc: (req.body.fullDesc || shortDesc || description || 'Full case study details.').trim()
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
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const project = await Project.findOne({
      $or: [
        { id: cleanId },
        { slug: cleanId },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
      ]
    });

    if (!project) {
      return res.status(404).json({ success: false, message: `Project with ID '${id}' not found.` });
    }

    Object.assign(project, req.body);
    const updatedProject = await project.save();

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: updatedProject
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
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const project = await Project.findOneAndDelete({
      $or: [
        { id: cleanId },
        { slug: cleanId },
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }
      ]
    });

    if (!project) {
      return res.status(404).json({ success: false, message: `Project with ID '${id}' not found.` });
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
