import { NotFoundCard } from "@/router/components/NotFoundCard";
import { PageTitle } from "@pkg/ui/components";

export function NotFoundPage() {
  return (
    <>
      <PageTitle title="Not Found" />

      <div className="size-full grid place-items-center pb-[5%]">
        <NotFoundCard />
      </div>
    </>
  );
}
