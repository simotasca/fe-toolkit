export {}

declare global {
  interface Window {
    applyTheme(): void;
    getTheme(): "light" | "dark" ;
    setTheme(theme: "light" | "dark"): any;
    RUNTIME_SETTINGS: any;
  }
}
