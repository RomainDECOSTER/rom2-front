import { toast } from 'react-toastify';

const params = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const toasts = {
  error: msg => toast.error(msg, params),
  info: msg => toast.info(msg, params),
  success: msg => toast.success(msg, params),
  warning: msg => toast.warning(msg, params),
  dismiss: toast.dismiss,
};

export { toasts as toast };
