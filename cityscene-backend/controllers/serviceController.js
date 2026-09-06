import { Op } from 'sequelize';
import { Service } from '../models/Service.js';
import { initialServices } from '../services/seedService.js';
import { sequelize } from '../config/db.js';

let columnsChecked = false;

/**
 * Ensure schema columns and seed services exist in MySQL database
 */
const ensureSeedServices = async () => {
  try {
    if (!columnsChecked) {
      columnsChecked = true;
      try {
        await Service.sync({ alter: true });
      } catch (alterErr) {
        console.log('[Service Schema Sync Notice]:', alterErr.message);
        try {
          const [cols] = await sequelize.query("SHOW COLUMNS FROM `services` LIKE 'cardImage'");
          if (!cols || cols.length === 0) {
            console.log('[Migration]: Adding missing cardImage, contentImage, whyChooseUsBackgroundImage columns...');
            await sequelize.query("ALTER TABLE `services` ADD COLUMN `cardImage` TEXT NULL");
            await sequelize.query("ALTER TABLE `services` ADD COLUMN `contentImage` TEXT NULL");
            await sequelize.query("ALTER TABLE `services` ADD COLUMN `whyChooseUsBackgroundImage` TEXT NULL");
            await sequelize.query("UPDATE `services` SET `cardImage` = `image` WHERE `cardImage` IS NULL OR `cardImage` = ''");
            await sequelize.query("UPDATE `services` SET `contentImage` = IFNULL(`heroImage`, `image`) WHERE `contentImage` IS NULL OR `contentImage` = ''");
            await sequelize.query("UPDATE `services` SET `whyChooseUsBackgroundImage` = IFNULL(`whyChooseImage`, `image`) WHERE `whyChooseUsBackgroundImage` IS NULL OR `whyChooseUsBackgroundImage` = ''");
          }
        } catch (queryErr) {
          console.error('[MySQL Column Migration Error]:', queryErr.message);
        }
      }
    }

    if (!initialServices || initialServices.length === 0) return;
    const count = await Service.count();
    if (count === 0) {
      await Service.bulkCreate(initialServices);
    }
  } catch (error) {
    console.error('[Service Seed Sync Error]:', error.message);
  }
};

/**
 * @desc    Get all services (Public / Admin)
 * @route   GET /api/services
 * @access  Public (if all=true, returns inactive too for admin)
 */
export const getServices = async (req, res, next) => {
  try {
    await ensureSeedServices();
    const showAll = req.query.all === 'true';

    const whereClause = {};
    if (!showAll) {
      whereClause.isActive = true;
    }

    const services = await Service.findAll({
      where: whereClause,
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });

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
    await ensureSeedServices();
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Service ID parameter is required.' });
    }

    const cleanId = id.trim().toLowerCase();
    const service = await Service.findOne({
      where: {
        [Op.or]: [
          { id: cleanId },
          { path: `/services/${cleanId}` }
        ]
      }
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
    await ensureSeedServices();
    const { title, id, displayTitle, shortDesc, image } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Service title is required.' });
    }

    const serviceId = (id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();
    const servicePath = req.body.path || `/services/${serviceId}`;

    const existingService = await Service.findByPk(serviceId);
    if (existingService) {
      return res.status(400).json({ success: false, message: `A service with ID '${serviceId}' already exists.` });
    }

    const defaultImg = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
    const cardImgUrl = req.body.cardImage || image || defaultImg;
    const heroImgUrl = req.body.heroImage || image || defaultImg;
    const contentImgUrl = req.body.contentImage || heroImgUrl;
    const whyChooseBgUrl = req.body.whyChooseUsBackgroundImage || req.body.whyChooseImage || defaultImg;

    const newService = await Service.create({
      ...req.body,
      id: serviceId,
      title: title.trim(),
      displayTitle: (displayTitle || `${title} Services`).trim(),
      path: servicePath,
      image: cardImgUrl,
      cardImage: cardImgUrl,
      heroImage: heroImgUrl,
      contentImage: contentImgUrl,
      whyChooseUsBackgroundImage: whyChooseBgUrl,
      whyChooseImage: whyChooseBgUrl,
      shortDesc: (shortDesc || 'Comprehensive service offering by CityScene Global.').trim(),
      position: req.body.position || 'bottom-left',
      order: req.body.order || 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
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
    await ensureSeedServices();
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const service = await Service.findByPk(cleanId);

    if (!service) {
      return res.status(404).json({ success: false, message: `Service with ID '${id}' not found.` });
    }

    await service.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: service
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
    await ensureSeedServices();
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    const service = await Service.findByPk(cleanId);

    if (!service) {
      return res.status(404).json({ success: false, message: `Service with ID '${id}' not found.` });
    }

    await service.destroy();

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
