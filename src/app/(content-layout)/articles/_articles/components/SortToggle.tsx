'use client';

import { OptionSelector } from '@/components/common/dropdown/OptionSelector';

interface SortToggleProps {
  onSelect: (value: '최신순' | '좋아요순') => void;
}

export default function SortToggle({ onSelect }: SortToggleProps) {
  return (
    <OptionSelector
      onSelect={(e) => {
        const selected = e.currentTarget.textContent;
        if (selected === '최신순' || selected === '좋아요순') {
          onSelect(selected);
        }
      }}
      options={['최신순', '좋아요순']}
      size="sm"
      placement=""
    />
  );
}
