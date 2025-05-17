'use client';

import { useState } from 'react';
import HeartIcon from '@/assets/HeartIcon';
import axiosClient from '@/lib/axiosClient';

interface LikeToggleButtonProps {
  articleId: number;
  isLiked?: boolean;
  likeCount: number;
}

export default function LikeToggleButton({
  articleId,
  isLiked = false,
  likeCount = 0,
}: LikeToggleButtonProps) {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);

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
      <span className="text-xs-rg sm:text-md-rg text-gray400">
        {count > 9999 ? '9999+' : count}
      </span>
    </button>
  );
}
