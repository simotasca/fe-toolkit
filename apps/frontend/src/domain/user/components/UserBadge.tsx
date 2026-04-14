import { userColor } from "@/domain/user/utils/color";
import { useMemo } from "react";

const styles = {
  size: {
    xs: "w-5 ring-3 text-[0.6rem] pb-px",
    sm: "w-6 ring-3 text-xs",
    base: "w-8 ring-4 text-base",
    lg: "w-10 ring-5 text-xl",
  },
  ring: {
    on: "dark:ring-zinc-900 ring-white",
    off: "ring-transparent",
  },
};

type User = { id: string | number, username: string };

type Size = keyof (typeof styles)["size"];

type Variants = { size?: Size; ring?: boolean };

export function UserBadge({
  user,
  size = "base",
  ring = false,
}: { user: User } & Variants) {
  const state = useMemo(() => {
    return {
      colorClass: Object.values(userColor(user.id)).join(" "),
      initials: user.username[0] || "?",
    };
  }, [user.id, user.username]);
  return (
    <>
      <div
        className={
          "aspect-square rounded-full flex items-center justify-center p-0 " +
          "uppercase font-mono font-bold leading-none tracking-wide " +
          styles.size[size] +
          " " +
          (ring ? styles.ring.on : styles.ring.off) +
          " " +
          state.colorClass
        }
      >
        <span>{state.initials}</span>
      </div>
    </>
  );
}
