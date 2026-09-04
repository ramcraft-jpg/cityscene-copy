import { flashApiFetch } from '../config/api';

/**
 * Service layer handling contact form submission via Flash API.
 */
export const submitContactForm = async (formData) => {
  const response = await flashApiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit contact form.');
  }

  return data;
};
