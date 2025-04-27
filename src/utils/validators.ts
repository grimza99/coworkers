// src/utils/validators.ts

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  // 예시: 비밀번호 8자 이상
  return password.length >= 8;
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword && confirmPassword.length > 0;
};

export const validateName = (name: string) => {
  // 이름이 비어있지 않은지만 체크
  return name.trim().length > 0;
};
