import { useLocalStorage } from "../state/storage/useLocalStorage";
import { useMemo } from "react";

export function useColumns(storageId: string, columns: string[]) {
  const [visible, setVisible] = useLocalStorage(
    "use-colummns-visible-" + storageId,
    columns
  );
  const hidden = useMemo(
    () => columns.filter((col) => !visible.includes(col)),
    [columns, visible]
  );
  const hide = (col: string) =>
    setVisible((cols) => cols.filter((c) => c != col));
  const show = (col: string) =>
    setVisible((cols) => (cols.includes(col) ? cols : [...cols, col]));
  const isVisible = (col: string) => visible.includes(col);
  const toggle = (col: string) => (isVisible(col) ? hide(col) : show(col));
  return { columns, visible, hidden, toggle, hide, show, isVisible };
}

// export function Columns(p: ReturnType<typeof useColumns>) {
//   return (
//     <>
//       {p.columns.map((c) => (
//         <col className={cn(!p.isVisible(c) && "collapse")} />
//       ))}
//     </>
//   );
// }
