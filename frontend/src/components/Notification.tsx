import { useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const useNotification = () => {
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Auto-hide after 3 seconds
  };

  const NotificationComponent = () => (
    notification && (
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {notification.message}
      </div>
    )
  );

  return { showNotification, NotificationComponent };
};

export default useNotification;