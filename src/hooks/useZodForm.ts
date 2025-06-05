import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

export default function useZodForm<T extends Record<string, unknown>>({
  validationSchema,
  defaultValues,
  ...rest
}: {
  validationSchema: ZodSchema<T>;
  defaultValues: UseFormProps<T>['defaultValues'];
} & Omit<UseFormProps<T>, 'resolver' | 'defaultValues'>): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'all',
    ...rest,
  });
}
