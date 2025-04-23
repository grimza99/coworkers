'use client';

import React from 'react';
import Button from '@/components/common/Button/button';

const ButtonTestPage = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  const PlusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <line x1="12" y1="5" x2="12" y2="19" strokeWidth={2} strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );

  return (
    <div className="flex gap-4 bg-gray-800 p-8">
      {/* Left column */}
      <div className="flex flex-col gap-4">
        <Button variant="primary" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="primary-hover" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="primary-pressed" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="gray" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
      </div>

      {/* Center column */}
      <div className="flex flex-col gap-4">
        <Button variant="text-primary" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="text-hover" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="text-pressed" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="text-gray" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-4">
        <Button variant="tp-primary" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="tp-hover" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="tp-pressed" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="tp-gray" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="gray-500" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
        <Button variant="red-background" size="md" onClick={handleClick}>
          {PlusIcon} 생성하기
        </Button>
      </div>
    </div>
  );
};

export default ButtonTestPage;
