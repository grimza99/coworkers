import { useState } from 'react';

export default function togglePasswordVisibilityLogic() {
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (key: 'password' | 'confirmPassword') => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return { isPasswordVisible, togglePasswordVisibility };
}
