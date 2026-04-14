import { Title } from "../../typography/titles";

export function TitleBox(p: React.PropsWithChildren<{ title: React.ReactNode; icon: React.ReactNode }>) {
  return (
    <>
      <div className="hbox flex-wrap mb-4">
        <Title className="min-w-52 icon:text-zinc-800 dark:icon:text-zinc-100">
          {p.icon}
          {p.title}
        </Title>
        {p.children}
      </div>
    </>
  );
}
