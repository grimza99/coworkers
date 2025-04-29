'use client';

import Image from 'next/image';
import visibilityOnIcon from '@/../public/icons/visibility_on.svg';
import visibilityOffIcon from '@/../public/icons/visibility_off.svg';

interface PasswordToggleButtonProps {
  onToggle: (show: boolean) => void;
  isVisible: boolean;
}

export default function PasswordToggleButton({ onToggle, isVisible }: PasswordToggleButtonProps) {
  return (
    <Image
      src={isVisible ? visibilityOnIcon : visibilityOffIcon}
      width={24}
      height={24}
      alt="Toggle Password Visibility"
      className="cursor-pointer"
      onClick={() => onToggle(!isVisible)}
    />
  );
}
