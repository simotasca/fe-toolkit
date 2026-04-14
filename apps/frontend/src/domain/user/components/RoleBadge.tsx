import { Badge } from "@pkg/ui";

export function RoleBadge({ role }: { role: string | { role: string } }) {
  const rolestr = (typeof role === "string" ? role : role.role).toLocaleLowerCase();
  return (
    <Badge color={rolestr === "admin" ? "yellow" : "zinc"} className="capitalize">
      {rolestr}
    </Badge>
  );
}