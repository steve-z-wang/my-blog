import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNotification } from "../ui/Notification";
import Button from "../ui/Button";
import Input from "../ui/Input";
import NavLinkStyled from "../ui/NavLinkStyled";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// Mobile menu button component
const MobileMenuButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <Button
    onClick={onClick}
    variant="text"
    size="sm"
    className="text-gray-500 hover:text-gray-600"
  >
    {isOpen ? (
      <XMarkIcon className="h-6 w-6" />
    ) : (
      <Bars3Icon className="h-6 w-6" />
    )}
  </Button>
);

// Mobile menu component
const MobileMenu = ({
  isOpen,
  email,
  setEmail,
  handleSubscribe,
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
        <NavLinkStyled to="/" block>
          Home
        </NavLinkStyled>
        <NavLinkStyled to="/about" block>
          About
        </NavLinkStyled>
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

// Subscribe form component
const SubscribeForm = ({
  email,
  setEmail,
  handleSubscribe,
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
    <Button onClick={handleSubscribe} variant="primary">
      Subscribe
    </Button>
  </div>
);

export default function NavBar() {
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showNotification } = useNotification();

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        showNotification("Subscribed successfully!", "success");
        setEmail("");
      } else {
        const errorData = await response.json();
        showNotification(errorData.error || "Subscription failed.", "error");
      }
    } catch (error) {
      showNotification("An error occurred. Please try again.", "error");
    }
  };

  return (
    <nav className="w-full bg-surface shadow-md">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="hover:opacity-80 transition-opacity duration-200"
            >
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
            <ul className="flex space-x-4">
              <li>
                <NavLinkStyled to="/">Home</NavLinkStyled>
              </li>
              <li>
                <NavLinkStyled to="/about">About</NavLinkStyled>
              </li>
            </ul>
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
