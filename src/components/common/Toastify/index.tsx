import Check from '@/assets/Check';
import ExclamationMark from '@/assets/ExclamationMark';
import { toast, ToastOptions } from 'react-toastify';

interface ToastifyOptions {
  position: 'top-right' | 'top-center' | 'top-left';
  closeOnClick: boolean;
  hideProgressBar: boolean;
  pauseOnHover: boolean;
  newestOnTop: boolean;
  icon?: React.ReactNode;
}

const defaultOption: ToastifyOptions = {
  position: 'top-right',
  closeOnClick: true,
  hideProgressBar: true,
  pauseOnHover: true,
  newestOnTop: true,
};

export const Toast = {
  success: (message: React.ReactNode, options: ToastOptions = {}) => {
    toast.success(message, {
      ...defaultOption,
      ...options,
      icon: <Check width="24" height="24" className="text-white" />,
    });
  },
  error: (message: React.ReactNode, options: ToastOptions = {}) => {
    toast.error(message, {
      ...defaultOption,
      ...options,
      icon: <ExclamationMark className="text-white" />,
    });
  },
  info: (message: React.ReactNode, options: ToastOptions = {}) => {
    toast.info(message, {
      ...defaultOption,
      ...options,
      icon: <ExclamationMark className="text-primary" />,
    });
  },
};
