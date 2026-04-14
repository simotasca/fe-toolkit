// import { NavLink, type NavLinkRenderProps, type To } from "react-router";

// export function SidebarElement(p: {
//   icon: React.ReactNode | ((nav: NavLinkRenderProps) => React.ReactNode);
//   title: string;
//   to: To;
//   end?: boolean;
//   disabled?: boolean;
// }) {
//   return (
//     <NavLink
//       to={p.to}
//       end={p.end}
//       className={p.disabled ? "pointer-events-none" : ""}
//     >
//       {(nav) => (
//         <SidebarTooltip text={p.title} disabled={p.disabled}>
//           <SidebarLink isActive={!p.disabled && nav.isActive}>
//             {typeof p.icon === "function" ? p.icon(nav) : p.icon}
//             <SidebarLabel>{p.title}</SidebarLabel>
//           </SidebarLink>
//         </SidebarTooltip>
//       )}
//     </NavLink>
//   );
// }
