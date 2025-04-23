'use client';
import { use } from 'react';
import ModalContext from './ModalContext';

export default function useModal() {
  const ctx = use(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
