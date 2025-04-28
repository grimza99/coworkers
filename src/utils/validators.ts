export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^([a-zA-Z0-9!@#$%^&*]){8,20}$/;
  return passwordRegex.test(password);
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  return password.trim() !== '' && confirmPassword.trim() !== '' && password === confirmPassword;
};

export const validateEmptyField = (name: string) => {
  const trimmedName = name.trim();
  return trimmedName.length >= 1 && trimmedName.length <= 30;
};
