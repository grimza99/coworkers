'use client';
import { use } from 'react';
import ModalContext from '@/components/common/modal/core/ModalContext';

export default function useModalContext() {
  const ctx = use(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
