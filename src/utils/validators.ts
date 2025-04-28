export const validateEmail = (email: string) => {
  // @TODO: 이메일 형식, 중복된 이메일인지도 체크
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  // @TODO: 비밀번호 8자리 이상, 영어 대문자와 특수기호 포함 (지금은 8자리만 체크)
  return password.length >= 8;
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  // @TODO: 비밀번호와 일치하는지 체크(지금은 길이만 됨)
  return password === confirmPassword && confirmPassword.length > 0;
};

export const validateName = (name: string) => {
  // @TODO: 트림, 중복된 이름인지도 체크
  return name.trim().length > 0;
};
