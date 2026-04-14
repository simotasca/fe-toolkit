export function SidebarLayout(p: React.PropsWithChildren<{ sidebar: React.ReactNode }>) {
  return (
    <div className="grid sm:grid-cols-[auto_1fr]">
      <div className="max-sm:hidden">
        {p.sidebar}
      </div>
      <div className="relative isolate">{p.children}</div>
    </div>
  );
}
