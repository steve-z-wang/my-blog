import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNotification } from "../ui/Notification";

// // Mobile menu button component
// const MobileMenuButton = ({
//   isOpen,
//   onClick,
// }: {
//   isOpen: boolean;
//   onClick: () => void;
// }) => (
//   <Button
//     onClick={onClick}
//     variant="primary"
//     size="sm"
//     className="text-gray-500 hover:text-gray-600"
//   >
//     {isOpen ? (
//       <XMarkIcon className="h-6 w-6" />
//     ) : (
//       <Bars3Icon className="h-6 w-6" />
//     )}
//   </Button>
// );
//
// // Mobile menu component
// const MobileMenu = ({
//   isOpen,
//   email,
//   setEmail,
//   handleSubscribe,
// }: {
//   isOpen: boolean;
//   email: string;
//   setEmail: (email: string) => void;
//   handleSubscribe: () => void;
// }) => {
//   if (!isOpen) return null;
//
//   return (
//     <div className="md:hidden">
//       <div className="px-2 pt-2 pb-3 space-y-2">
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/about">About</NavLink>
//         <div className="px-4 py-2">
//           <Input
//             type="email"
//             placeholder="Your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mb-2"
//           />
//           <Button
//             onClick={handleSubscribe}
//             variant="primary"
//             size="md"
//             fullWidth
//           >
//             Subscribe
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// // Subscribe form component
// const SubscribeForm = ({
//   email,
//   setEmail,
//   handleSubscribe,
// }: {
//   email: string;
//   setEmail: (email: string) => void;
//   handleSubscribe: () => void;
// }) => (
//   <div className="flex items-center space-x-2">
//     <Input
//       type="email"
//       placeholder="Your email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//     />
//     <Button onClick={handleSubscribe} variant="primary">
//       Subscribe
//     </Button>
//   </div>
// );

export default function NavBar() {
  // const [email, setEmail] = useState("");
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { showNotification } = useNotification();

  // const handleSubscribe = async () => {
  //   try {
  //     const response = await fetch("/api/subscribe", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });

  //     if (response.ok) {
  //       showNotification("Subscribed successfully!", "success");
  //       setEmail("");
  //     } else {
  //       const errorData = await response.json();
  //       showNotification(errorData.error || "Subscription failed.", "error");
  //     }
  //   } catch (error) {
  //     showNotification("An error occurred. Please try again.", "error");
  //   }
  // };

  // <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"></div>
  //         <div className="ml-4">
  //           <SubscribeForm
  //             email={email}
  //             setEmail={setEmail}
  //             handleSubscribe={handleSubscribe}
  //           />
  //         </div>

  const NavLinkStyled: React.FC<{
    to: string;
    children: React.ReactNode;
    className?: string;
  }> = ({ to, children, className, ...props }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-lg sm:text-base text-muted font-medium ${className} ${
          isActive ? "text-muted underline font-semibold" : ""
        }`
      }
      {...props}
    >
      {children}
    </NavLink>
  );

  return (
    <nav className="flex items-center justify-between px-6 p-4">
      {/* Logo */}
      <div className="hidden sm:block">
        <NavLink to="/">
          <h1 className="text-xl font-bold">sw.log</h1>
        </NavLink>
      </div>

      {/* NavLinks */}
      <div className="">
        <ul className="flex space-x-6">
          <li>
            <NavLinkStyled to="/">Posts</NavLinkStyled>
          </li>
          <li>
            <NavLinkStyled to="/tags">Tags</NavLinkStyled>
          </li>
          <li>
            <NavLinkStyled to="/archive">Archive</NavLinkStyled>
          </li>
          <li>
            <NavLinkStyled to="/about">About</NavLinkStyled>
          </li>
        </ul>
      </div>
    </nav>
  );
}
