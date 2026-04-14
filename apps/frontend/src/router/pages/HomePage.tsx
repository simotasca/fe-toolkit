import { PageContainer, TitleBox } from "@pkg/ui/components";
import IconHome from "~icons/heroicons/home";

export function HomePage() {
  return (
    <>
      <PageContainer pageTitle="Home">
        <TitleBox title="Echad | Homepage" icon={<IconHome />} />
      </PageContainer>
    </>
  );
}