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

export const validateName = (name: string) => {
  // validateEmptyField
  const trimmedName = name.trim();
  return trimmedName.length >= 1 && trimmedName.length <= 30;
};

// 닉네임 10글자
// 리미트10일 때 에러메시지 length가 0일 때 값일 때 에러메시지
// as const form필드에 인풋으로 넘겨주는게 낫지 않을까
//지금은 4가지로 fielㅇㅔ form maping해서 넘겨주는 게 아니라 일반 props처럼 넘겨주도록
