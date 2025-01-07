// utils/validation.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6; // Minimum password length
};

export const validateUsername = (username) => {
  return username.length >= 3; // Minimum username length
};
