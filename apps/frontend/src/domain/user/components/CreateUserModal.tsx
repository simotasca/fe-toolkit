import { SubmitButton, Button } from "@pkg/ui";
import { api } from "@/lib/api";
import { UnexpectedStatusError } from "@pkg/api";
import { z } from "zod";
import { Modal, ModalActions, ModalBody, ModalDescription, ModalTitle } from "@pkg/ui/overlays/modal";
import { Field, Description, Label, Input } from "@pkg/ui/form";
import { useAuth } from "@/domain/auth/context";
import { useNotify } from "@pkg/notification";
import { useForm } from "@pkg/hooks";

const validator = z.object({
  inviteEmail: z.email().min(1),
});

type CreateUserModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateUserModal(p: CreateUserModalProps) {
  const notify = useNotify();
  const user = useAuth();
  
  const { register, handleSubmit, loading, errors, setError, setErrors, setFields } = useForm(validator);

  const safeClose = () => {
    if (!loading) {
      setFields({});
      setErrors({});
      p.onClose();
    }
  };

  const onSubmit = handleSubmit(({ inviteEmail }) => 
    api.auth.invite(inviteEmail)
      .then((data) => {
        if (data.label === "ok") {
          notify("success", "Invito inviato", `Il nuovo utente riceverà un link di invito all'indirizzo "${inviteEmail}"`);
          safeClose();
        } else if (data.label === "user already exist") {
          setError("inviteEmail", "Utente già registrato");
          notify("error", "Conflitto d'identità", `È già presente un utente associato all'email: "${inviteEmail}"`);
          console.warn("ERROR user already exists: ", data.body);
        } else throw new UnexpectedStatusError(data);
      })
      .catch(error => {
        notify("error", "Errore durante l'invio dell'invito", "Per favore riprova.");
        console.error("ERROR inviting user:", error);
      })
  ).onInvalid((errors) => {
    console.warn("ERROR validating form data:", errors);
    notify("warn", "Sono stati inseriti dei dati non validi", "per favore ricontrolla i dati prima di riprovare.");
  });

  return (
    <Modal open={p.open} onClose={() => safeClose()} size="md">
      <form onSubmit={onSubmit}>
        <ModalTitle>Creazione nuovo utente</ModalTitle>
        <ModalDescription>L'email selezionata riceverà un messaggio con le istruzioni per completare la registrazione.</ModalDescription>
        <ModalBody>
          <Field>
            <Label>Email</Label>
            <Description>{errors?.inviteEmail?.message}</Description>
            <Input {...register("inviteEmail")} type="email" placeholder="Nuovo account..." />
          </Field>
        </ModalBody>
        <ModalActions className="justify-start">
          <SubmitButton text="Conferma" loading={loading} color="green" />
          <Button onClick={safeClose} disabled={loading}>
            Annulla
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
}