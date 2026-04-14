import { PageTitle } from "./PageTitle";
import css from "./pageContainer.module.css";

type PageContainerProps = React.ComponentProps<"div"> & { pageTitle?: string };

export function PageContainer({ className, pageTitle, ...p }: PageContainerProps) {
  return (
    <>
      {pageTitle && <PageTitle title={pageTitle} />}
      <div {...p} className={[css.pageContainer, className].join(" ")} />
    </>
  );
}
