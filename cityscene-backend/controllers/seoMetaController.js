import { Op } from 'sequelize';
import { SeoMeta } from '../models/SeoMeta.js';
import { initialSeoMetas } from '../services/seedService.js';

/**
 * Ensure seed SEO metas exist in database
 */
export const ensureSeedSeoMeta = async () => {
  try {
    const count = await SeoMeta.count();
    if (count === 0 && initialSeoMetas && initialSeoMetas.length > 0) {
      for (const item of initialSeoMetas) {
        await SeoMeta.findOrCreate({
          where: { pageKey: item.pageKey },
          defaults: item
        });
      }
    }
  } catch (error) {
    console.error('[SEO Meta Seed Error]:', error.message);
  }
};

/**
 * @desc    Get all SEO meta configurations
 * @route   GET /api/seo
 * @access  Public
 */
export const getAllSeoMeta = async (req, res, next) => {
  try {
    await ensureSeedSeoMeta();
    const { group, search } = req.query;

    const whereClause = {};
    if (group && group !== 'all') {
      whereClause.pageGroup = group;
    }
    if (search) {
      whereClause[Op.or] = [
        { pageKey: { [Op.like]: `%${search}%` } },
        { pageName: { [Op.like]: `%${search}%` } },
        { title: { [Op.like]: `%${search}%` } },
        { h1Tag: { [Op.like]: `%${search}%` } }
      ];
    }

    const records = await SeoMeta.findAll({
      where: whereClause,
      order: [['pageGroup', 'ASC'], ['pageName', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get SEO meta by pageKey or path
 * @route   GET /api/seo/:pageKey
 * @access  Public
 */
export const getSeoMetaByPageKey = async (req, res, next) => {
  try {
    await ensureSeedSeoMeta();
    const { pageKey } = req.params;
    if (!pageKey) {
      return res.status(400).json({ success: false, message: 'pageKey parameter is required.' });
    }

    const cleanKey = decodeURIComponent(pageKey).trim().toLowerCase();

    // Check by pageKey exact or normalized
    let record = await SeoMeta.findOne({
      where: {
        [Op.or]: [
          { pageKey: cleanKey },
          { pageKey: cleanKey.replace(/^\//, '').replace(/\//g, ':') }
        ]
      }
    });

    if (!record) {
      // Return 200 with default fallback template object so frontend always has clean data
      return res.status(200).json({
        success: true,
        data: null,
        message: `No explicit SEO configuration found for '${pageKey}'. Default fallback applies.`
      });
    }

    return res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create or Update SEO Meta for a pageKey
 * @route   PUT /api/seo/:pageKey
 * @access  Private (Admin)
 */
export const updateSeoMeta = async (req, res, next) => {
  try {
    await ensureSeedSeoMeta();
    const { pageKey } = req.params;
    if (!pageKey) {
      return res.status(400).json({ success: false, message: 'pageKey parameter is required.' });
    }

    const cleanKey = decodeURIComponent(pageKey).trim().toLowerCase();
    const {
      pageName,
      pageGroup,
      title,
      description,
      keywords,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      robots,
      h1Tag
    } = req.body;

    let record = await SeoMeta.findOne({ where: { pageKey: cleanKey } });

    if (!record) {
      record = await SeoMeta.create({
        pageKey: cleanKey,
        pageName: pageName || cleanKey,
        pageGroup: pageGroup || 'main',
        title: title || 'CityScene Global',
        description: description || '',
        keywords: keywords || '',
        canonicalUrl: canonicalUrl || '',
        ogTitle: ogTitle || title || '',
        ogDescription: ogDescription || description || '',
        ogImage: ogImage || '',
        robots: robots || 'index, follow',
        h1Tag: h1Tag || ''
      });
    } else {
      await record.update({
        pageName: pageName !== undefined ? pageName : record.pageName,
        pageGroup: pageGroup !== undefined ? pageGroup : record.pageGroup,
        title: title !== undefined ? title : record.title,
        description: description !== undefined ? description : record.description,
        keywords: keywords !== undefined ? keywords : record.keywords,
        canonicalUrl: canonicalUrl !== undefined ? canonicalUrl : record.canonicalUrl,
        ogTitle: ogTitle !== undefined ? ogTitle : record.ogTitle,
        ogDescription: ogDescription !== undefined ? ogDescription : record.ogDescription,
        ogImage: ogImage !== undefined ? ogImage : record.ogImage,
        robots: robots !== undefined ? robots : record.robots,
        h1Tag: h1Tag !== undefined ? h1Tag : record.h1Tag
      });
    }

    return res.status(200).json({
      success: true,
      message: `SEO settings for page '${cleanKey}' updated successfully.`,
      data: record
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete / Reset SEO Meta for a pageKey
 * @route   DELETE /api/seo/:pageKey
 * @access  Private (Admin)
 */
export const deleteSeoMeta = async (req, res, next) => {
  try {
    const { pageKey } = req.params;
    const cleanKey = decodeURIComponent(pageKey).trim().toLowerCase();

    const record = await SeoMeta.findOne({ where: { pageKey: cleanKey } });
    if (!record) {
      return res.status(404).json({ success: false, message: `SEO record for '${pageKey}' not found.` });
    }

    await record.destroy();

    return res.status(200).json({
      success: true,
      message: `SEO record for '${pageKey}' deleted/reset successfully.`
    });
  } catch (error) {
    next(error);
  }
};
