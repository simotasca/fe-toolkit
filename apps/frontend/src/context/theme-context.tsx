import { createContext } from "@pkg/react-create-context";
import React, { useState, type SetStateAction } from "react";

export type Theme = "dark" | "light";
export type SetTheme = (theme: Theme) => void;
export type ToggleTheme = () => void;

if (!window.setTheme) {
  throw new Error(
    "Theme script `public/static-theme.js` must be included in <head> of index.html before mounting React in order to use theme context."
  );
      
}

export const [, useTheme, ThemeProvider] = createContext<[Theme, SetTheme, ToggleTheme]>({
  initializer: () => {
    const [theme, setThemeState] = useState<Theme>(window.getTheme());
    
    const setTheme = (t: Theme | SetStateAction<Theme>) => {
      if (typeof t === "function") {
        setThemeState(prev => {
          const val = t(prev);
          window.setTheme(val);
          return val;
        });
      } else {
        setThemeState(t);
        window.setTheme(t);
      }
    };
    
    const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");
    
    return [theme, setTheme, toggleTheme] as const;
  },
});

type ThemeToggleProps = Omit<React.ComponentProps<"span">, "children"> & { 
  children?: React.ReactNode | ((p: Theme) => React.ReactNode)
};
export function ThemeToggle({ className, onClick, children, ...rest }: ThemeToggleProps) {
  const [theme, , toggleTheme] = useTheme();
  return (
    <span 
      className={["inline-block", className].join(" ")}
      onClick={(e) => {
        toggleTheme();
        onClick?.(e);
      }} 
      {...rest} 
    >
      {typeof children === "function" ? children(theme) : children}
    </span>
  );
}
