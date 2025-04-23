export const baseStyles =
  'rounded-lg font-medium flex items-center justify-center gap-2 transition-all';

export const sizeStyles = {
  sm: 'w-full h-[8] text-xs',
  md: 'w-full h-[10] text-xs',
  lg: 'w-full h-[48px] text-xs',
  xl: 'w-full h-[10] text-xs',
  xxl: 'w-full h-[49px] text-xs',
};

export const variantStyles = {
  primary: 'bg-[var(--color-primary)] text-white border border-[var(--color-primary)]',
  'primary-hover':
    'bg-[var(--color-primary-hover)] text-white border border-[var(--color-primary-hover)]',
  'primary-pressed':
    'bg-[var(--color-primary-pressed)] text-white border border-[var(--color-primary-pressed)]',
  gray: 'bg-[var(--color-gray500)] text-white border border-[var(--color-gray500)]',

  'text-primary': 'bg-[#FFFFFF] text-[var(--color-primary)] border border-[var(--color-primary)]',
  'text-hover':
    'bg-[#FFFFFF] text-[var(--color-primary-hover)] border border-[var(--color-primary-hover)]',
  'text-pressed':
    'bg-[#FFFFFF] text-[var(--color-primary-pressed)] border border-[var(--color-primary-pressed)]',
  'text-gray': 'bg-[#FFFFFF] text-[var(--color-gray500)] border border-[var(--color-gray500)]',

  'tp-primary': 'bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)]',
  'tp-hover':
    'bg-transparent text-[var(--color-primary-hover)] border border-[var(--color-primary-hover)]',
  'tp-pressed':
    'bg-transparent text-[var(--color-primary-pressed)] border border-[var(--color-primary-pressed)]',
  'tp-gray': 'bg-transparent text-[var(--color-gray500)] border border-[var(--color-gray500)]',

  'gray-500':
    'bg-[var(--color-gray500)] text-[var(--color-gray300)] border border-[var(--color-gray500)]',
  'red-background':
    'bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger-hover)] border border-[var(--color-danger)]',
};

export const disabledStyles = 'cursor-not-allowed';
