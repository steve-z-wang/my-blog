import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import useNotification from './Notification';

// Mobile menu button component
const MobileMenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="text-gray-500 hover:text-gray-600 focus:outline-none"
  >
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  </button>
);

// Navigation links component
const NavLinks = ({ getLinkClass }: { getLinkClass: (isActive: boolean) => string }) => (
  <ul className="flex space-x-8">
    <li>
      <NavLink
        to="/"
        className={({ isActive }) => 
          `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            isActive 
              ? "bg-blue-100 text-blue-700" 
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/about"
        className={({ isActive }) => 
          `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            isActive 
              ? "bg-blue-100 text-blue-700" 
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`
        }
      >
        About
      </NavLink>
    </li>
  </ul>
);

// Subscribe form component
const SubscribeForm = ({ 
  email, 
  setEmail, 
  handleSubscribe 
}: { 
  email: string; 
  setEmail: (email: string) => void; 
  handleSubscribe: () => void;
}) => (
  <div className="flex items-center space-x-2">
    <input
      type="email"
      placeholder="Your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <button
      onClick={handleSubscribe}
      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
    >
      Subscribe
    </button>
  </div>
);

// Mobile menu component
const MobileMenu = ({ 
  isOpen, 
  getLinkClass, 
  email, 
  setEmail, 
  handleSubscribe 
}: { 
  isOpen: boolean; 
  getLinkClass: (isActive: boolean) => string;
  email: string;
  setEmail: (email: string) => void;
  handleSubscribe: () => void;
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isActive 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isActive 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          About
        </NavLink>
        <div className="px-4 py-2">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
          />
          <button
            onClick={handleSubscribe}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default function NavBar() {
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <NavLink to="/" className="hover:opacity-80 transition-opacity duration-200">
                <h1 className="text-xl sm:text-2xl text-gray-900">
                  Steve Wang's Blog
                </h1>
              </NavLink>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <MobileMenuButton 
                isOpen={isMenuOpen} 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
              />
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <NavLinks getLinkClass={getLinkClass} />
              <div className="ml-4">
                <SubscribeForm 
                  email={email} 
                  setEmail={setEmail} 
                  handleSubscribe={handleSubscribe} 
                />
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <MobileMenu 
            isOpen={isMenuOpen}
            getLinkClass={getLinkClass}
            email={email}
            setEmail={setEmail}
            handleSubscribe={handleSubscribe}
          />
        </div>
      </nav>

      <NotificationComponent />
    </>
  );
}