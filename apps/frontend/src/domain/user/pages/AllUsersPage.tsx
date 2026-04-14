import { Button } from "@pkg/ui";
import { PageContainer, TitleBox } from "@pkg/ui/components";
import IconUsers from "~icons/heroicons/users";
import IconPlusCircle from "~icons/heroicons/plus-circle";
import { t } from "@pkg/ui/table";
import { api } from "@/lib/api";
import type { UserDTO } from "@/domain/user/model";
import { UnexpectedStatusError } from "@pkg/api";
import { useNotify } from "@pkg/notification";
import { useState } from "react";
import { useAutoFetch } from "@pkg/hooks";
import { routes } from "@/lib/routes";
import { RowLink } from "@/components/table/RowLink";
import { UserBadge } from "@/domain/user/components/UserBadge";
import { RoleBadge } from "@/domain/user/components/RoleBadge";
import { useCache } from "@pkg/cache/useCache";
import { CreateUserModal } from "@/domain/user/components/CreateUserModal";

export function AllUsersPage() {
  const notify = useNotify();
  
  // table
  const [data, setData] = useState<Array<UserDTO>>([]);

  const [fetcher] = useCache("all-users-page", fetchAllUsersData);
  
  const { loading, error, refetch } = useAutoFetch(() =>
    fetcher()
      .then(setData)
      .catch((err) => {
        notify("error", err);
        throw err;
      }),
  );

  return (
    <PageContainer pageTitle="Accounts">
      <TitleBox title="CMS Accounts" icon={<IconUsers />}>
        <InviteButton />
        <Button color="sky" onClick={() => refetch()}>reload</Button>
      </TitleBox>

      <t.Container>
        <t.InfoPanel {...{ loading, error, refetch }} items={data.length} />

        <t.Table>
          <t.Head>
            <t.Row>
              <t.Header className="w-0">&ndash;</t.Header>
              <t.Header className="w-0">Username</t.Header>
              <t.Header>Email</t.Header>
              <t.Header className="w-0">Role</t.Header>
            </t.Row>
          </t.Head>

          <t.Body>
            {data.map((user) => (
              <RowLink href={routes.user.one.href(user.id)} key={user.id}>
                <t.Cell>
                  <UserBadge user={user} size="sm" />
                </t.Cell>
                <t.Cell label="Username" className="w-44 truncate">
                  {user.username}
                </t.Cell>
                <t.Cell label="Email">{user.email}</t.Cell>
                <t.Cell label="Role">
                  <RoleBadge role={user} />
                </t.Cell>
              </RowLink>
            ))}
          </t.Body>
        </t.Table>
      </t.Container>
    </PageContainer>
  );
}

function InviteButton() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <>
      <Button color="green" onClick={() => setIsInviteModalOpen(true)}>
        <IconPlusCircle />
        <span>Aggiungi utente</span>
      </Button>

      <CreateUserModal
        open={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </>
  );
}

async function fetchAllUsersData(): Promise<Array<UserDTO>> {
  return api.user
    .list()
    .then(async (res) => {
      if (!res.ok) throw new UnexpectedStatusError(res);
      return res.body;
    })
    .catch((err) => {
      console.error("ERROR fetching users list: ", err);
      throw "Errore imprevisto durante il caricamento degli utenti";
    });
}
