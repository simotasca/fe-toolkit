import { api } from "@/lib/api";
import { routes } from "@/lib/routes";
import { UnexpectedStatusError } from "@pkg/api";
import { useForm } from "@pkg/hooks";
import { Button, SubmitButton, Text, Title } from "@pkg/ui";
import { PageContainer, PageTitle } from "@pkg/ui/components";
import { Description, Field, Input, Label } from "@pkg/ui/form";
import { Modal, ModalActions, ModalDescription, ModalTitle } from "@pkg/ui/overlays/modal";
import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { z } from "zod";

const validator = z
  .object({
    password: z.string().min(4).max(255),
    confirmPassword: z.string().min(4).max(255)
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Le password non coincidono",
    path: ["confirmPassword"],
  });

export function ResetPasswordPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const otp = searchParams.get("otp");
  
  if (!otp) return <Navigate to={routes.auth.login.href()} />;

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInvalidSession, setIsInvalidSession] = useState(false);

  const { register, handleSubmit, loading, getError } = useForm(validator);
  const onSubmit = handleSubmit(({ password }) => 
    api.auth.resetPassword.confirm(otp, password)
      .then((data) => {
        setErrMsg(null);
        if (data.label === "ok") setIsSuccess(true);
        else if (data.label === "invalid otp") setIsInvalidSession(true);
        else throw new UnexpectedStatusError(data);
      })
      .catch(error => {
        setErrMsg("Si è verificato un errore imprevisto");
        console.error("ERROR calling login api:", error);
      })
  ).onInvalid((errors) => {
    setErrMsg("Verifica i dati inseriti");
    console.warn("ERROR validating form data:", errors);
  });

  return (
    <>
      <PageTitle title="Reset Password" />

      <PageContainer>
        <Title className="mb-6">Echad CMS | Reset password</Title>
        
        <form onSubmit={onSubmit}>
          <div className="max-w-sm space-y-4">
            <Field>
              <Label>Nuova password</Label>
              <Description>{getError("confirmPassword")}</Description>
              <Input {...register("password")} type="password" maxLength={255} />
            </Field>

            <Field>
              <Label>Conferma password</Label>
              <Description>{getError("confirmPassword")}</Description>
              <Input {...register("confirmPassword")} type="password" maxLength={255} />
            </Field>

            <Text className="block text-red-600 dark:text-red-400">{errMsg}</Text>

            <SubmitButton text="Salva" loading={loading} color="blue" />
          </div>
        </form>
      </PageContainer>

      <Modal open={isSuccess} locked>
        <ModalTitle type="success">
          Account creato con successo!
        </ModalTitle>
        <ModalDescription>
          Esegui la login per accedere alla tua area riservata
        </ModalDescription>
        <ModalActions>
          <Button color="blue" onClick={() => navigate(routes.auth.login.href())}>Login</Button>
        </ModalActions>
      </Modal>

      <Modal open={isInvalidSession} locked>
        <ModalTitle type="warn">
          La sessione è scaduta
        </ModalTitle>
        <ModalDescription>
          Per favore richiedi un nuovo link di recupero password.
        </ModalDescription>
        <ModalActions>
          <Button onClick={() => navigate(routes.auth.login.href())}>Esci</Button>
        </ModalActions>
      </Modal>
    </>
  );
}