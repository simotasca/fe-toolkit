import { useNotificationsQueue } from "@pkg/react-notification-context";
import { NotificationPanel as BaseNotificationPanel, Tooltipd } from "@pkg/ui";
import { Sidebar, SidebarBody, SidebarFoot, SidebarHead, SidebarHeading, SidebarIcon, SidebarItem, SidebarLabel, SidebarLayout, SidebarLink, SidebarProvider, SidebarToggle, SidebarTooltip, useSidebar } from "@pkg/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router";
import IconHome from "~icons/heroicons/home";
import IconStack from "~icons/heroicons/circle-stack";
// import IconMoon from "~icons/heroicons/moon";
// import IconNewspaper from "~icons/heroicons/newspaper";
// import IconSun from "~icons/heroicons/sun";
import IconUsers from "~icons/heroicons/users";
// import IconFeather from "~icons/feather/feather";
// import IconLibrary from "~icons/heroicons/building-library";
// import IconCalendar from "~icons/heroicons/calendar-days";
// import IconEnvelope from "~icons/heroicons/envelope";
// import IconGroup from "~icons/heroicons/user-group";
import { ThemeToggle } from "@/context/theme-context";
// import { routes } from "@/config/routes";
import imgLogoEchad from "@/assets/logo-echad.png";

export function Layout() {
  return (
    <>
      <SidebarLayout sidebar={<MainSidebar />}>
        <Outlet />
      </SidebarLayout>
      
      <NotificationPanel />
    </>
  );
}

function NotificationPanel() {
  const { queue } = useNotificationsQueue();
  return <BaseNotificationPanel>
    {queue.map((n) => (
      <div key={n.id} className="pointer-events-auto max-w-sm w-full ml-auto">
        <n.Component {...n.props} />
      </div>
    ))}
  </BaseNotificationPanel>
}

function MainSidebar() {
  // const logout = useLogout();
  const { pathname } = useLocation();

  return (
    <SidebarProvider>
      <Sidebar>
        <EchadSidebarHeader />

        <SidebarBody>
          <SidebarHeading>menu</SidebarHeading>

          <ChabadSidebarLink to="/" isActive={pathname === "/"} icon={<IconHome />}>
            Homepage
          </ChabadSidebarLink>

          <ChabadSidebarLink to="/users" icon={<IconUsers />}>
            Accounts
          </ChabadSidebarLink>

          <ChabadSidebarLink to="/something" icon={<IconStack />}>
            Something
          </ChabadSidebarLink>

          {/* <ChabadSidebarLink
            to={routes.articles.all.href()}
            icon={<IconFeather />}
          >
            Articoli
          </ChabadSidebarLink> */}

          {/* <ChabadSidebarLink
            to={routes.organizations.all.href()}
            icon={<IconLibrary />}
          >
            Organizzazioni
          </ChabadSidebarLink>

          <ChabadSidebarLink
            to={routes.responsibles.all.href()}
            icon={<IconGroup className="scale-110" />}
          >
            Responsabili
          </ChabadSidebarLink>

          <ChabadSidebarLink
            to={routes.events.all.href()}
            icon={<IconCalendar />}
          >
            Eventi
          </ChabadSidebarLink>

          <ChabadSidebarLink
            to={routes.newsletter.href()}
            icon={<IconEnvelope />}
          >
            Newsletter
          </ChabadSidebarLink> */}

          {/* 
          <Link to="/">
            <s.SidebarLink isActive={location?.pathname.startsWith("/fs")}>
              <FolderOpenIcon />
              <s.SidebarLabel>Archivio</s.SidebarLabel>
            </s.SidebarLink>
          </Link> */}
        </SidebarBody>

        {/* <SidebarFoot className="py-0">
          <SidebarDropdown>
            <SidebarDropdownButton className="py-4" invert>
              <UserIcon />
              <div className="text-left leading-tight w-full max-w-44">
                <p className="capitalize text-indigo-600 dark:text-indigo-300 truncate">Account</p>
              </div>
            </SidebarDropdownButton>

            <hr className="dark:border-zinc-700" />

            <SidebarDropdownContent className="bg-zinc-100 dark:bg-zinc-950">
              <div className="py-2">
                <SidebarButton onClick={logout} className="py-2">
                  <ArrowRightStartOnRectangleIcon className="translate-x-0.5" />
                  <span>Logout</span>
                </SidebarButton>
                <SidebarButton className="py-2">
                  <Cog6ToothIcon />
                  <span>Settings</span>
                </SidebarButton>
                <ThemeToggle>
                  {(theme) => (
                    <SidebarButton className="py-2">
                      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
                      <span>Toggle Theme</span>
                    </SidebarButton>
                  )}
                </ThemeToggle>
                
              </div>
            </SidebarDropdownContent>
          </SidebarDropdown>
        </SidebarFoot> */}

        <SidebarFoot>
          <ThemeToggle>
            {(theme) => (
              <button className="w-sidebar-closed whitespace-nowrap oveflow-hidden">
                Theme: {theme}
              </button>
            )}
          </ThemeToggle>
        </SidebarFoot>
      </Sidebar>
    </SidebarProvider>
  );
}

function ChabadSidebarLink(p: { to: string, isActive?: boolean, children: string, icon: React.ReactNode }) {
  const [open] = useSidebar();
  const { pathname } = useLocation();
  const isActive = p.isActive ?? pathname.startsWith(p.to);
  return (
    <Link to={p.to}>
      <SidebarTooltip text={p.children} disabled={open}>
        <SidebarLink isActive={isActive}>
          {p.icon}
          <SidebarLabel>{p.children}</SidebarLabel>
        </SidebarLink>
      </SidebarTooltip>
    </Link>
  );
}

function EchadSidebarHeader() {
  const [open] = useSidebar();

  return (
    <SidebarHead>
      <SidebarItem>
        <SidebarTooltip text="Espandi sidebar">
          <div className="group relative">
            <SidebarToggle disabled={open} className="cursor-auto">
              <SidebarIcon 
                src={imgLogoEchad} 
                className={[
                  "p-2.5 invert dark:invert-0 h-16 object-contain", 
                  open ? "" : "opacity-100 group-hover:opacity-0 cursor-e-resize"
                ].join(" ")} 
              />
              <SidebarLayoutIcon 
                className={[
                  "h-8 text-zinc-800 dark:text-zinc-400",
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none", 
                  open ? "" : "pointer-events-auto group-hover:opacity-100"
                ].join(" ")}
              />
            </SidebarToggle>
          </div>
        </SidebarTooltip>
        <div className="flex w-full items-center justify-between">
          <b className="font-medium translate-y-px">Echad CMS</b>
          {open && 
          <Tooltipd tooltip="Chiudi sidebar" place="right" appearDelayMs={0} appearDurationMs={0}>
            <SidebarToggle className="cursor-w-resize">
              <SidebarLayoutIcon className="h-8 text-zinc-800 dark:text-zinc-400" />
            </SidebarToggle>
          </Tooltipd>
          }
        </div>
      </SidebarItem>
    </SidebarHead>
  );
}

export function SidebarLayoutIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" data-slot="icon" {...p}>
      <path fill="currentColor" d="M6.835 4c-.451.004-.82.012-1.137.038-.386.032-.659.085-.876.162l-.2.086c-.44.224-.807.564-1.063.982l-.103.184c-.126.247-.206.562-.248 1.076-.043.523-.043 1.19-.043 2.135v2.664c0 .944 0 1.612.043 2.135.042.515.122.829.248 1.076l.103.184c.256.418.624.758 1.063.982l.2.086c.217.077.49.13.876.162.316.026.685.034 1.136.038zm11.33 7.327c0 .922 0 1.654-.048 2.243-.043.522-.125.977-.305 1.395l-.082.177a4 4 0 0 1-1.473 1.593l-.276.155c-.465.237-.974.338-1.57.387-.59.048-1.322.048-2.244.048H7.833c-.922 0-1.654 0-2.243-.048-.522-.042-.977-.126-1.395-.305l-.176-.082a4 4 0 0 1-1.594-1.473l-.154-.275c-.238-.466-.34-.975-.388-1.572-.048-.589-.048-1.32-.048-2.243V8.663c0-.922 0-1.654.048-2.243.049-.597.15-1.106.388-1.571l.154-.276a4 4 0 0 1 1.594-1.472l.176-.083c.418-.18.873-.263 1.395-.305.589-.048 1.32-.048 2.243-.048h4.334c.922 0 1.654 0 2.243.048.597.049 1.106.15 1.571.388l.276.154a4 4 0 0 1 1.473 1.594l.082.176c.18.418.262.873.305 1.395.048.589.048 1.32.048 2.243zm-10 4.668h4.002c.944 0 1.612 0 2.135-.043.514-.042.829-.122 1.076-.248l.184-.103c.418-.256.758-.624.982-1.063l.086-.2c.077-.217.13-.49.162-.876.043-.523.043-1.19.043-2.135V8.663c0-.944 0-1.612-.043-2.135-.032-.386-.085-.659-.162-.876l-.086-.2a2.67 2.67 0 0 0-.982-1.063l-.184-.103c-.247-.126-.562-.206-1.076-.248-.523-.043-1.19-.043-2.135-.043H8.164L8.165 4z"></path>
    </svg>
  );
}