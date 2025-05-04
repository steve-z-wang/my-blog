import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import useNotification from './Notification';

export default function NavBar() {
  const [email, setEmail] = useState('');
  const { showNotification, NotificationComponent } = useNotification();

  const handleSubscribe = async () => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        showNotification('Subscribed successfully!', 'success');
        setEmail('');
      } else {
        const errorData = await response.json();
        showNotification(errorData.error || 'Subscription failed.', 'error');
      }
    } catch (error) {
      showNotification('An error occurred. Please try again.', 'error');
    }
  };

  const getLinkClass = (isActive: boolean) =>
    isActive ? "text-blue-600 font-bold" : "hover:text-blue-600";

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="text-2xl text-gray-900">
            Steve Wang's Blog
          </h1>

          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => getLinkClass(isActive)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => getLinkClass(isActive)}
              >
                About
              </NavLink>
            </li>
          </ul>

          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
        </div>
      </nav>

      <NotificationComponent />
    </>
  );
}