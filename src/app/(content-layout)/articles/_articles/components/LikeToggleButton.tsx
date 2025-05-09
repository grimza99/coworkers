'use client';

import { useState } from 'react';

interface LikeToggleButtonProps {
  isLiked?: boolean;
  initialCount?: number;
}

export default function LikeToggleButton({
  isLiked = false,
  initialCount = 0,
}: LikeToggleButtonProps) {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(initialCount);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setCount((prev) => prev + 1);
    }
  };

  return (
    <button onClick={toggleLike} className="flex items-center gap-1">
      <img
        width={16}
        height={16}
        src={liked ? '/icons/full-heart.svg' : '/icons/heart.svg'}
        alt="좋아요"
      />
      <span className="text-md-rg text-gray400">{count > 9999 ? '9999+' : count}</span>
    </button>
  );
}
