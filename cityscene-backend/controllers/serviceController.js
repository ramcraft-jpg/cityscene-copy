import Service from '../models/Service.js';

/**
 * @desc    Get all services (Public / Admin)
 * @route   GET /api/services
 * @access  Public (if all=true, returns inactive too for admin)
 */
export const getServices = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: { $ne: false } };
    const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });
    return res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single service by ID or Slug
 * @route   GET /api/services/:id
 * @access  Public
 */
export const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Service ID parameter is required.' });
    }

    const cleanId = id.trim().toLowerCase();
    const service = await Service.findOne({
      $or: [{ id: cleanId }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!service) {
      return res.status(404).json({ success: false, message: `Service with ID '${id}' not found.` });
    }

    return res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new service
 * @route   POST /api/services
 * @access  Private (Admin)
 */
export const createService = async (req, res, next) => {
  try {
    const { title, id, displayTitle, shortDesc, image } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Service title is required.' });
    }

    // Generate slug id if missing
    const serviceId = (id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();
    const servicePath = req.body.path || `/services/${serviceId}`;

    const existingService = await Service.findOne({ id: serviceId });
    if (existingService) {
      return res.status(400).json({ success: false, message: `A service with ID '${serviceId}' already exists.` });
    }

    const newService = await Service.create({
      ...req.body,
      id: serviceId,
      title: title.trim(),
      displayTitle: (displayTitle || `${title} Services`).trim(),
      path: servicePath,
      image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      shortDesc: (shortDesc || 'Comprehensive service offering by CityScene Global.').trim()
    });

    return res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: newService
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing service
 * @route   PUT /api/services/:id
 * @access  Private (Admin)
 */
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const service = await Service.findOne({
      $or: [{ id: cleanId }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!service) {
      return res.status(404).json({ success: false, message: `Service with ID '${id}' not found.` });
    }

    // Update service fields
    Object.assign(service, req.body);
    const updatedService = await service.save();

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: updatedService
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete service
 * @route   DELETE /api/services/:id
 * @access  Private (Admin)
 */
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const service = await Service.findOneAndDelete({
      $or: [{ id: cleanId }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }]
    });

    if (!service) {
      return res.status(404).json({ success: false, message: `Service with ID '${id}' not found.` });
    }

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
