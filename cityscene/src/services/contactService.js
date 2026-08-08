// Service abstraction for career page contact form submission
export const submitCareerContact = async (contactData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Thank you for reaching out! We have received your inquiry and will respond soon.",
        data: contactData
      });
    }, 1000);
  });
};
