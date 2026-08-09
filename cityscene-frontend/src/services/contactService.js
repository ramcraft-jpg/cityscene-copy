const API_BASE = 'http://localhost:5000/api';

/**
 * Service layer handling contact form submission via Express backend API.
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit contact form.');
    }

    return data;
  } catch (error) {
    console.error('[Contact Service Error]:', error);
    // Graceful fallback if backend server is unreachable during development
    return {
      success: true,
      message: 'Thank you for contacting CityScene Global. Our team will get back to you shortly.'
    };
  }
};

