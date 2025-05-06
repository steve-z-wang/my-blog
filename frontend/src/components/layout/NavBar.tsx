import { useState } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import React from 'react';
import { useNotification } from '../ui/Notification';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Form from '../ui/Form';

interface NavLinkStyledProps extends NavLinkProps {
  children: React.ReactNode;
  block?: boolean;
}

const NavLinkStyled: React.FC<NavLinkStyledProps> = ({ children, block = false, className, ...props }) => {
  const baseStyles = 'rounded-md text-sm font-medium transition-all duration-200';
  const padding = 'px-4 py-2';
  const activeStyles = 'bg-blue-100 text-blue-700';
  const inactiveStyles = 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';
  
  return (
    <NavLink
      {...props}
      className={({ isActive }) => 
        `${baseStyles} ${padding} ${isActive ? activeStyles : inactiveStyles} ${block ? 'block' : ''} ${className || ''}`
      }
    >
      {children}
    </NavLink>
  );
};

// Mobile menu button component
const MobileMenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <Button
    onClick={onClick}
    variant="text"
    size="sm"
    className="text-gray-500 hover:text-gray-600"
  >
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  </Button>
);

// Navigation links component
const NavLinks = () => (
  <ul className="flex space-x-8">
    <li>
      <NavLinkStyled to="/">Home</NavLinkStyled>
    </li>
    <li>
      <NavLinkStyled to="/about">About</NavLinkStyled>
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
    <Input
      type="email"
      placeholder="Your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Button
      onClick={handleSubscribe}
      variant="primary"
      size="md"
    >
      Subscribe
    </Button>
  </div>
);

// Mobile menu component
const MobileMenu = ({ 
  isOpen, 
  email, 
  setEmail, 
  handleSubscribe 
}: { 
  isOpen: boolean; 
  email: string;
  setEmail: (email: string) => void;
  handleSubscribe: () => void;
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-2">
        <NavLinkStyled to="/" block>Home</NavLinkStyled>
        <NavLinkStyled to="/about" block>About</NavLinkStyled>
        <div className="px-4 py-2">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2"
          />
          <Button
            onClick={handleSubscribe}
            variant="primary"
            size="md"
            fullWidth
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function NavBar() {
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showNotification } = useNotification();

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

  return (
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
            <NavLinks />
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
          email={email}
          setEmail={setEmail}
          handleSubscribe={handleSubscribe}
        />
      </div>
    </nav>
  );
}