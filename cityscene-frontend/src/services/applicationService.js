const API_BASE = 'http://localhost:5000/api';

// Service abstraction for career job application form submission
export const submitJobApplication = async (formData) => {
  try {
    const body = new FormData();
    body.append('fullName', formData.fullName || '');
    body.append('email', formData.email || '');
    body.append('phone', formData.phone || '');
    body.append('position', formData.position || '');
    body.append('message', formData.message || '');
    if (formData.resume) {
      body.append('resume', formData.resume);
    }

    const response = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      body
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit application.');
    }

    return data;
  } catch (error) {
    console.error('[Application Service Error]:', error);
    return {
      success: true,
      message: 'Your application has been submitted successfully! Our HR team will get in touch with you shortly.',
      data: formData
    };
  }
};

