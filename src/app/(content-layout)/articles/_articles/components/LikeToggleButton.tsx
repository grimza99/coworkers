'use client';

import { useState } from 'react';
import HeartIcon from '@/assets/HeartIcon';
import axiosClient from '@/lib/axiosClient';

interface LikeToggleButtonProps {
  articleId: number;
  isLiked?: boolean;
  initialCount?: number;
}

export default function LikeToggleButton({
  articleId,
  isLiked = false,
  initialCount = 0,
}: LikeToggleButtonProps) {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(initialCount);

  const toggleLike = async () => {
    try {
      const res = liked
        ? await axiosClient.delete(`/articles/${articleId}/like`)
        : await axiosClient.post(`/articles/${articleId}/like`);
      setLiked(res.data.isLiked);
      setCount(res.data.likeCount);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <button type="button" onClick={toggleLike} className="flex items-center gap-1">
      <HeartIcon filled={liked} />
      <span className="text-md-rg text-gray400">{count > 9999 ? '9999+' : count}</span>
    </button>
  );
}
