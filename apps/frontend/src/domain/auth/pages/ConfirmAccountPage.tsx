import { api } from "@/lib/api";
import { routes } from "@/lib/routes";
import { UnexpectedStatusError } from "@pkg/api";
import { useForm } from "@pkg/hooks";
import { Button, SubmitButton, Text, Title } from "@pkg/ui";
import { PageTitle } from "@pkg/ui/components";
import { Description, Field, Input, Label } from "@pkg/ui/form";
import { Modal, ModalActions, ModalDescription, ModalTitle } from "@pkg/ui/overlays/modal";
import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { z } from "zod";

const validator = z
  .object({
    username: z.string().trim().min(2).max(100),
    password: z.string().min(4).max(255),
    confirmPassword: z.string().min(4).max(255),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Le password non coincidono",
    path: ["confirmPassword"],
  });

export function ConfirmAccountPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const otp = searchParams.get("otp");
  
  if (!otp) return <Navigate to={routes.auth.login.href()} />;

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [isInvalidSession, setIsInvalidSession] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const { register, handleSubmit, loading, getError } = useForm(validator);
  const onSubmit = handleSubmit(({ confirmPassword, ...formData }) => 
    api.auth.confirm({ ...formData, otp })
      .then((data) => {
        setErrMsg(null);
        if (data.label === "ok") setIsSuccess(true);
        else if (data.label === "session expired") {
          setIsInvalidSession(true);
          console.warn("Sessione scaduta", data.body);
        } 
        else throw new UnexpectedStatusError(data);
      })
      .catch((error) => {
        setErrMsg("Si è verificato un errore imprevisto");
        console.error("ERROR confirming account:", error);
      })
  ).onInvalid((errors) => {
    setErrMsg("Verifica i dati inseriti");
    console.warn("ERROR validating form data:", errors);
  });

  return (
    <>
      <PageTitle title="Conferma Account" />

      <Title className="mb-6">Echad | Confirm account</Title>
      
      <form onSubmit={onSubmit}>
        <div className="p-6 max-w-sm space-y-4">

          <Field>
            <Label>Username</Label>
            <Description>{getError("username")}</Description>
            <Input {...register("username")} maxLength={100} />
          </Field>

          <Field>
            <Label>Password</Label>
            <Description>{getError("password")}</Description>
            <Input {...register("password")} type="password" maxLength={255} />
          </Field>

          <Field>
            
            <Label>Conferma password</Label>
            <Description>{getError("confirmPassword")}</Description>
            <Input {...register("confirmPassword")} type="password" maxLength={255} />
          </Field>

          <Text className="block text-red-600">{errMsg}</Text>

          <SubmitButton text="Conferma" loading={loading} color="blue" />
        </div>
      </form>

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
          Per favore richiedi un nuovo link di registrazione.
        </ModalDescription>
        <ModalActions>
          <Button onClick={() => navigate(routes.auth.login.href())}>Esci</Button>
        </ModalActions>
      </Modal>
    </>
  );
}