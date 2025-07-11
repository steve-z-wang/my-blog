// context/BackgroundContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

const routes: Array<{ pattern: RegExp; background: string }> = [
  { pattern: /^\/posts(\/.*)?$/, background: "bg-secondary" },
  { pattern: /^\/about(\/.*)?$/, background: "bg-secondary" },
];

function matchRoute(pathname: string): string {
  for (const route of routes) {
    if (route.pattern.test(pathname)) {
      return route.background;
    }
  }
  
  return "bg-primary"; // default
}

const BackgroundContext = createContext<(color: string) => void>(() => {});

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [background, setBackground] = useState("bg-primary"); // default

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
