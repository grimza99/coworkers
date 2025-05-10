export const COMMON_TEXTFIELD_STYLE =
  'placeholder:text-gray500 text-md-rg sm:text-lg-rg placeholder:text-md-rg sm:placeholder:text-lg-rg focus:outline-none';

export const GAP_SIZE = {
  '12': 'gap-3',
  '16': 'gap-4',
  '24': 'gap-6',
  '32': 'gap-8',
} as const;

export const LABEL_SIZE = {
  '16/16': 'text-lg-md sm:text-lg-md',
  '14/16': 'text-md-md sm:text-lg-md',
  '16/20': 'text-lg-md sm:text-xl-bold',
} as const;

export const getBorderClassName = ({
  isFocused,
  showSuccess,
  showError,
}: {
  isFocused: boolean;
  showSuccess: boolean;
  showError: boolean;
}) => {
  const isDefault = isFocused || (!showSuccess && !showError);
  const isSuccess = !isFocused && showSuccess;
  const isError = !isFocused && showError;

  if (isDefault) return 'border-border';
  if (isSuccess) return 'border-primary';
  if (isError) return 'border-danger';

  return '';
};
