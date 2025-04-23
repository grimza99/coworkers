// pages/button-test.tsx

import React from 'react';
import Button from './src/components/common/Button/button'; // Button 컴포넌트 경로

const ButtonTestPage = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Test Your Button</h1>

      <Button variant="primary" size="md" onClick={handleClick}>
        Primary Button
      </Button>

      <Button variant="secondary" size="sm" disabled={true} onClick={handleClick}>
        Disabled Button
      </Button>

      <Button variant="text-primary" size="md" onClick={handleClick}>
        Text Button
      </Button>
    </div>
  );
};

export default ButtonTestPage;
