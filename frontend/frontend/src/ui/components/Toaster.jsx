import toast, { Toaster } from "react-hot-toast";

const Notify = {
  update: (toastId, message, type) => {
    toast[type](message, {
      id: toastId,
      position: "top-right",
      style: {
        background: "#333",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    });
  },

  loading: (message) => {
    return toast.loading(message, {
      position: "top-right",
      style: {
        background: "#333",
        color: "#fff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    });
  },
};

export default Notify;
