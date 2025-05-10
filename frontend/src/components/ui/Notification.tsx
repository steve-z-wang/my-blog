import React, { createContext, useContext, useState, useCallback } from "react";
import { FiX } from "react-icons/fi";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const styles = {
    success: "bg-success/10 text-success",
    error: "bg-error/10 text-error",
    info: "bg-muted/10 text-muted",
    warning: "bg-warning/10 text-warning",
  };

  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${styles[type]} animate-fade-in bg-surface`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="hover:opacity-70"
          aria-label="Close notification"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
  } | null>(null);

  const showNotification = useCallback(
    (message: string, type: NotificationType) => {
      setNotification({ message, type });
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <NotificationComponent
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export default NotificationComponent;
