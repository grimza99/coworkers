'use client';

import { useState } from 'react';
import { formatDateToKorean } from '../hooks/format-date-to-korean';

export default function HandleDate() {
  const [currentDate, setCurrentDate] = useState(formatDateToKorean(Date()));
  console.log(currentDate);
  return (
    <div>
      <p></p>
    </div>
  );
}
