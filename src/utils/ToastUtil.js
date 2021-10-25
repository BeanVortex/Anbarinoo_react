import { toast } from "react-toastify";

export const toastError = (desc) => {
  toast.error(desc, {
    position: "bottom-right",
    closeButton: true,
    closeOnClick: true,
    autoClose: 3000,
  });
};

export const toastWarn = (desc) => {
  toast.warn(desc, {
    position: "bottom-right",
    closeButton: true,
    closeOnClick: true,
    autoClose: 3000,
  });
};

export const toastSuccess = (desc) => {
  toast.success(desc, {
    position: "bottom-right",
    closeButton: true,
    closeOnClick: true,
    autoClose: 3000,
  });
};
