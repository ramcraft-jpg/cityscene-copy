// Service abstraction for career job application form submission
export const submitJobApplication = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Your application has been submitted successfully! Our HR team will get in touch with you shortly.",
        data: formData
      });
    }, 1000);
  });
};
