export const validateEmail = (email: string) => {
  // @TODO: 중복된 이메일인지 체크
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/;
  return passwordRegex.test(password);
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  return password.trim() !== '' && confirmPassword.trim() !== '' && password === confirmPassword;
};

export const validateName = (name: string) => {
  // @TODO: 트림, 중복된 이름인지도 체크
  return name.trim().length > 0;
};
