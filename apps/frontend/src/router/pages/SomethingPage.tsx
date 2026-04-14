import { Text } from "@pkg/ui";
import { PageContainer, TitleBox } from "@pkg/ui/components";
import IconStack from "~icons/heroicons/circle-stack";


export function SomethingPage() {
  return (
    <PageContainer pageTitle="Something">
      <TitleBox title="Something" icon={<IconStack />} />
      <Text light>This is the something page.</Text>
    </PageContainer>
  );
}