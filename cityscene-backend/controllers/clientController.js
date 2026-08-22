import { Op } from 'sequelize';
import { Client } from '../models/Client.js';
import { initialClients } from '../services/seedService.js';

/**
 * Ensure initial seed clients exist in MySQL database
 */
let isSeeded = false;

export const ensureSeedClients = async () => {
  if (isSeeded) return;
  try {
    const count = await Client.count();
    if (count === 0 && initialClients && initialClients.length > 0) {
      await Client.bulkCreate(initialClients, { ignoreDuplicates: true });
    }
    isSeeded = true;
  } catch (error) {
    console.error('[Client Seed Sync Error]:', error.message);
  }
};

/**
 * @desc    Get all trusted clients
 * @route   GET /api/clients or GET /api/projects/clients
 * @access  Public
 */
export const getClients = async (req, res, next) => {
  try {
    await ensureSeedClients();
    const clients = await Client.findAll({
      order: [['createdAt', 'ASC']]
    });

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
 * @desc    Get single client by ID
 * @route   GET /api/clients/:id
 * @access  Public
 */
export const getClientById = async (req, res, next) => {
  try {
    await ensureSeedClients();
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ success: false, message: `Client with ID '${id}' not found.` });
    }

    return res.status(200).json({
      success: true,
      data: client
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new client
 * @route   POST /api/clients
 * @access  Private (Admin)
 */
export const createClient = async (req, res, next) => {
  try {
    await ensureSeedClients();
    const { name, logo, id } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Client name is required.' });
    }

    if (!logo || !logo.trim()) {
      return res.status(400).json({ success: false, message: 'Client logo URL is required.' });
    }

    const clientId = (id || `client-${Date.now()}`).trim();

    const existing = await Client.findByPk(clientId);
    if (existing) {
      return res.status(400).json({ success: false, message: `A client with ID '${clientId}' already exists.` });
    }

    const newClient = await Client.create({
      id: clientId,
      name: name.trim(),
      logo: logo.trim()
    });

    return res.status(201).json({
      success: true,
      message: 'Client created successfully.',
      data: newClient
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update client
 * @route   PUT /api/clients/:id
 * @access  Private (Admin)
 */
export const updateClient = async (req, res, next) => {
  try {
    await ensureSeedClients();
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ success: false, message: `Client with ID '${id}' not found.` });
    }

    await client.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Client updated successfully.',
      data: client
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete client
 * @route   DELETE /api/clients/:id
 * @access  Private (Admin)
 */
export const deleteClient = async (req, res, next) => {
  try {
    await ensureSeedClients();
    const { id } = req.params;
    const cleanId = decodeURIComponent(id || '').trim();

    let client = await Client.findByPk(id);
    if (!client && cleanId !== id) {
      client = await Client.findByPk(cleanId);
    }

    if (!client) {
      client = await Client.findOne({
        where: {
          [Op.or]: [
            { id: id },
            { id: cleanId },
            { logo: id },
            { logo: cleanId }
          ]
        }
      });
    }

    if (client) {
      await client.destroy();
    } else {
      await Client.destroy({
        where: {
          [Op.or]: [
            { id: id },
            { id: cleanId }
          ]
        }
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Client deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
