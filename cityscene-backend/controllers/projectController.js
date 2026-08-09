import Project from '../models/Project.js';
import Client from '../models/Client.js';
import { initialProjects, initialClients } from '../services/seedService.js';

export const getProjects = async (req, res, next) => {
  try {
    let projects = [];
    try {
      projects = await Project.find({});
    } catch (dbErr) {
      console.warn('[Project Controller] DB fetch warning:', dbErr.message);
    }

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

export const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Project slug parameter is required.' });
    }

    let project = null;
    try {
      project = await Project.findOne({
        $or: [
          { slug: slug.toLowerCase() },
          { id: slug }
        ]
      });
    } catch (dbErr) {
      console.warn('[Project Controller] DB slug lookup warning:', dbErr.message);
    }

    if (!project) {
      project = initialProjects.find(
        (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug
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

export const getClients = async (req, res, next) => {
  try {
    let clients = [];
    try {
      clients = await Client.find({});
    } catch (dbErr) {
      console.warn('[Project Controller] Client DB fetch warning:', dbErr.message);
    }

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
