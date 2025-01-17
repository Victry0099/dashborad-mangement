// src/components/common/CustomToast.jsx
import React from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ToastContent = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "confirm",
}) => (
  <div className="min-w-[280px] sm:min-w-[350px] max-w-[90vw] bg-white rounded-lg shadow-xl overflow-hidden">
    {/* Header */}
    <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>

    {/* Body */}
    <div className="px-6 py-4">
      <p className="text-sm text-gray-600">{message}</p>
    </div>

    {/* Footer */}
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
      <button
        onClick={() => {
          toast.dismiss();
          onCancel?.();
        }}
        className="inline-flex items-center px-4 py-2 border border-gray-300 
                   text-sm font-medium rounded-md text-gray-700 bg-white 
                   hover:bg-gray-50 focus:outline-none focus:ring-2 
                   focus:ring-offset-2 focus:ring-blue-500 transition-colors
                   duration-200"
      >
        {cancelText}
      </button>
      <button
        onClick={() => {
          toast.dismiss();
          onConfirm?.();
        }}
        className={`inline-flex items-center px-4 py-2 border border-transparent 
                    text-sm font-medium rounded-md text-white focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 transition-colors duration-200
                    ${
                      type === "delete"
                        ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                        : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                    }`}
      >
        {confirmText}
      </button>
    </div>
  </div>
);

const NotificationToast = ({ message, icon }) => (
  <div className="flex items-center min-w-[280px] max-w-[90vw]">
    {icon && <span className="mr-2">{icon}</span>}
    <p className="text-sm font-medium text-gray-600">{message}</p>
  </div>
);

export const CustomToast = {
  confirm: ({
    title = "Confirm Action",
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    options = {},
  }) => {
    toast(
      <ToastContent
        title={title}
        message={message}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={onConfirm}
        onCancel={onCancel}
        type="confirm"
      />,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        className: "custom-toast-container",
        ...options,
      }
    );
  },

  delete: ({
    title = "Confirm Delete",
    message = "Are you sure you want to delete this item?",
    onConfirm,
    onCancel,
    options = {},
  }) => {
    toast(
      <ToastContent
        title={title}
        message={message}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={onConfirm}
        onCancel={onCancel}
        type="delete"
      />,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        className: "custom-toast-container",
        ...options,
      }
    );
  },

  success: (message, options = {}) => {
    toast.success(<NotificationToast message={message} icon="✅" />, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-green-600",
      progressClassName: "bg-green-400",
      ...options,
    });
  },

  error: (message, options = {}) => {
    toast.error(<NotificationToast message={message} icon="❌" />, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-red-600",
      progressClassName: "bg-red-400",
      ...options,
    });
  },

  info: (message, options = {}) => {
    toast.info(<NotificationToast message={message} icon="ℹ️" />, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-blue-600",
      progressClassName: "bg-blue-400",
      ...options,
    });
  },

  warning: (message, options = {}) => {
    toast.warning(<NotificationToast message={message} icon="⚠️" />, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-yellow-600",
      progressClassName: "bg-yellow-400",
      ...options,
    });
  },
};

// Add custom CSS
const styles = `
  .custom-toast-container {
    padding: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  .Toastify__toast {
    border-radius: 0.5rem !important;
    padding: 0 !important;
  }

  .Toastify__toast-body {
    padding: 0 !important;
  }

  .Toastify__progress-bar {
    height: 3px !important;
  }

  @media (max-width: 480px) {
    .Toastify__toast-container {
      width: 100vw !important;
      padding: 0 16px !important;
    }
  }
`;

// Add styles to document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default CustomToast;
