export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,20}$/;
  return passwordRegex.test(password);
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  return password.trim() !== '' && confirmPassword.trim() !== '' && password === confirmPassword;
};

export const validateName = (name: string) => {
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 20;
};
