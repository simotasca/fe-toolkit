import { Row } from "@pkg/ui/table";
import { useNavigate } from "react-router";

type RowLinkProps = React.ComponentProps<typeof Row> & { href?: string };
export function RowLink({ href, className, onClick, ...p }: RowLinkProps) {
  const navigate = useNavigate();
  return (
    <Row
      {...p}
      className={[href ? "cursor-pointer" : "", className].join(" ")}
      onClick={(e) => {
        onClick?.(e);
        href && navigate(href);
      }}
    />
  );
}
