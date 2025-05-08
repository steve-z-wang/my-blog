// context/BackgroundContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

function matchRoute(pathname: string): string {
  if (pathname.startsWith("/posts")) return "bg-surface";

  return "bg-background"; // default
}

const BackgroundContext = createContext<(color: string) => void>(() => {});

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [background, setBackground] = useState("bg-background"); // default

  useEffect(() => {
    const bg = matchRoute(location.pathname);
    setBackground(bg);
  }, [location.pathname]);

  return (
    <BackgroundContext.Provider value={setBackground}>
      <div className={background + " min-h-screen"}>{children}</div>
    </BackgroundContext.Provider>
  );
}
