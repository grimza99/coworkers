'use client';

import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import CommentSubmit from '@/assets/CommentSubmit';

const isBrowser = typeof window !== 'undefined';

const scrollToTop = () => {
  if (!isBrowser) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      debouncedHandleScroll.cancel();
    };
  }, []);

  return (
    isVisible && (
      <div className="animate-scale-in fixed right-[7%] bottom-20 z-[200] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full sm:h-10 sm:w-10">
        <CommentSubmit
          width="40"
          height="40"
          disabled={false}
          className="text-primary"
          onClick={scrollToTop}
        />
      </div>
    )
  );
}
