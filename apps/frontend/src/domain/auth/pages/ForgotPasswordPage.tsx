import { api } from "@/lib/api";
import { routes } from "@/lib/routes";
import { UnexpectedStatusError } from "@pkg/api";
import { useForm } from "@pkg/hooks";
import { Button, Text, TextLink, Title } from "@pkg/ui";
import { PageContainer, PageTitle } from "@pkg/ui/components";
import { Description, Field, Input, Label } from "@pkg/ui/form";
import { Modal, ModalActions, ModalDescription, ModalTitle } from "@pkg/ui/overlays/modal";
import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import ProgressIcon from "~icons/material-symbols/progress-activity-sharp";

const validator = z.object({
  email: z.email().min(1),
});

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const { register, handleSubmit, loading, getError, setError } = useForm(validator, { defaults: { email: "" } });
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onSubmit = handleSubmit((formData) => 
    api.auth.resetPassword.request(formData.email)
      .then((data) => {
        setErrMsg(null);
        if (data.label === "ok") setIsSuccess(true);
        else if (data.label === "user not registered") setError("email", "Account non registrato");
        else throw new UnexpectedStatusError(data);
      })
      .catch(error => {
        setErrMsg("Si è verificato un errore imprevisto");
        console.error("ERROR calling reset password api:", error);
      })
  ).onInvalid((errors) => {
    setErrMsg("Verifica i dati inseriti");
    console.warn("ERROR validating form data:", errors);
  });

  return (
    <>
      <PageTitle title="Forgot Passord" />

      <PageContainer>
        <Title className="mb-6">Echad CMS | Recupero password</Title>

        <form onSubmit={onSubmit} className="max-w-sm space-y-4 mb-6">
          <Field>
            <Label>Email</Label>
            <Description>{getError("email")}</Description>
            <Input {...register("email")} />
            <Description>Un link di recupero sarà inviato all'account selezionato</Description>
          </Field>

          <Text className="block text-red-600 dark:text-red-400">{errMsg}</Text>

          <Button type="submit" color="blue" disabled={loading}>
            <div>Invia</div>
            {loading && <div className="pl-0.5"><ProgressIcon className="size-4 animate-spin" /></div>}
          </Button>
        </form>

        <TextLink to={routes.auth.login.href()}> 
          Torna alla login
        </TextLink>

        <Modal open={isSuccess} locked>
          <ModalTitle type="success">
            Email di recupero inviata!
          </ModalTitle>
          <ModalDescription>
            Apri il link di recupero inviato alla tua email per impostare una nuova password
          </ModalDescription>
          <ModalActions className="justify-start">
            <Button color="green" onClick={() => navigate(routes.auth.login.href())}>Chiudi</Button>
          </ModalActions>
        </Modal>
      </PageContainer>
    </>
  );
}
