export const baseStyles =
  'rounded-lg font-medium flex items-center justify-center gap-2 transition-all';

export const sizeStyles = {
  sm: 'w-[74px] h-[32px] text-xs',
  md: 'w-[111px] h-[40px] text-xs',
  lg: 'w-[125px] h-[48px] text-xs',
  xl: 'w-[138px] h-[40px] text-xs',
  xxl: 'w-[332px] h-[49px] text-xs',
};

export const variantStyles = {
  primary: 'bg-[#10B981] text-white border border-[#10B981]',
  'primary-hover': 'bg-[#059669] text-white border border-[#059669]',
  'primary-pressed': 'bg-[#047857] text-white border border-[#047857]',
  gray: 'bg-[#93A3B8] text-white border border-[#93A3B8]',

  'text-primary': 'bg-[#FFFFFF] text-[#10B981] border border-[#10B981]',
  'text-hover': 'bg-[#FFFFFF] text-[#059669] border border-[#059669]',
  'text-pressed': 'bg-[#FFFFFF] text-[#047857] border border-[#047857]',
  'text-gray': 'bg-[#FFFFFF] text-[#93A3B8] border border-[#93A3B8]',

  'tp-primary': 'bg-transparent text-[#10B981] border border-[#10B981]',
  'tp-hover': 'bg-transparent text-[#059669] border border-[#059669]',
  'tp-pressed': 'bg-transparent text-[#047857] border border-[#047857]',
  'tp-gray': 'bg-transparent text-[#93A3B8] border border-[#93A3B8]',

  'gray-500': 'bg-[#64748B] text-[#93A3B8] border border-[#64748B]',
  'red-background': 'bg-red-500 text-white hover:bg-red-600 border border-red-500',
};

export const disabledStyles = 'cursor-not-allowed';
