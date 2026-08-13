import Service from '../models/Service.js';

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({}).sort({ createdAt: 1 });
    return res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Service ID parameter is required.' });
    }

    const service = await Service.findOne({ id: id.trim().toLowerCase() });
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
