import React, { useEffect, useState } from 'react';
import { getSeoMetaByPageKey } from '../../services/seoService';

const DEFAULT_SEO = {
  title: 'CityScene Global - Enterprise Software & AI Solutions',
  description: 'CityScene Global empowers businesses with bespoke AI, web, mobile, and custom enterprise software solutions.',
  keywords: 'CityScene Global, AI Solutions, Custom Software, Web Development, Mobile Apps, Digital Transformation',
  canonicalUrl: '',
  ogTitle: 'CityScene Global - Enterprise Technology Solutions',
  ogDescription: 'Empower your business with state-of-the-art enterprise software and AI architectures.',
  ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  robots: 'index, follow'
};

/**
 * Helper to update or inject a meta element in document head
 */
const updateMetaTag = (selector, attrName, attrValue, content) => {
  if (!content) return;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Helper to update or inject a link element in document head
 */
const updateLinkTag = (rel, href) => {
  if (!href) return;
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export default function SEO({ pageKey, fallback = {} }) {
  const [seo, setSeo] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSeoData = async () => {
      if (!pageKey) return;
      try {
        const data = await getSeoMetaByPageKey(pageKey);
        if (isMounted) {
          setSeo(data);
        }
      } catch (err) {
        console.warn(`[SEO Component] Fallback used for ${pageKey}:`, err.message);
      }
    };

    fetchSeoData();

    return () => {
      isMounted = false;
    };
  }, [pageKey]);

  useEffect(() => {
    // Construct effective values using priority: DB Data -> Component Fallback -> System Defaults
    const effectiveTitle = (seo?.title || fallback.title || DEFAULT_SEO.title).trim();
    const effectiveDesc = (seo?.description || fallback.description || DEFAULT_SEO.description).trim();
    const effectiveKeywords = (seo?.keywords || fallback.keywords || DEFAULT_SEO.keywords).trim();
    const effectiveCanonical = (seo?.canonicalUrl || fallback.canonicalUrl || window.location.href).trim();
    const effectiveOgTitle = (seo?.ogTitle || fallback.ogTitle || effectiveTitle).trim();
    const effectiveOgDesc = (seo?.ogDescription || fallback.ogDescription || effectiveDesc).trim();
    const effectiveOgImage = (seo?.ogImage || fallback.ogImage || DEFAULT_SEO.ogImage).trim();
    const effectiveRobots = (seo?.robots || fallback.robots || DEFAULT_SEO.robots).trim();

    // 1. Update Document Title
    document.title = effectiveTitle;

    // 2. Standard Meta Tags
    updateMetaTag('meta[name="description"]', 'name', 'description', effectiveDesc);
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', effectiveKeywords);
    updateMetaTag('meta[name="robots"]', 'name', 'robots', effectiveRobots);

    // 3. Canonical URL
    updateLinkTag('canonical', effectiveCanonical);

    // 4. Open Graph Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', effectiveOgTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', effectiveOgDesc);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', effectiveOgImage);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', effectiveCanonical);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  }, [seo, fallback]);

  return null;
}
