import { useEffect } from "react";

type PageProps = React.PropsWithChildren<{ title: string | (() => string) }>;

export function PageTitle(p: PageProps) {
  const titleString = typeof p.title === "function" ? p.title() : p.title;

  useEffect(() => {
    document.title = titleString;
  }, [p.title]);
  
  return <>{p.children}</>;
}