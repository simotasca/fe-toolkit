import { api } from "@/lib/api";
import { routes } from "@/lib/routes";
import { UnexpectedStatusError } from "@pkg/api";
import { useForm } from "@pkg/hooks";
import { SubmitButton, Text, TextLink, Title } from "@pkg/ui";
import { PageContainer, PageTitle } from "@pkg/ui/components";
import { Description, Field, Input, Label } from "@pkg/ui/form";
import { withMinDuration } from "@pkg/utils/promises";
import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

const validator = z.object({
  email: z.email().trim().min(1),
  password: z.string().min(1),
});

export function LoginPage() {
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState<string | null>(null);
  
  const { register, handleSubmit, loading, getError: error } = useForm(validator);
  const onSubmit = handleSubmit(async (formData) =>
    withMinDuration(api.auth.login(formData), 500).then((data) => {
      setErrMsg(null);
      if (data.label === "OK") {
        navigate("/");
      } else if (data.label === "invalid credentials") {
        setErrMsg("Credenziali non valide");
      } else {
        throw new UnexpectedStatusError(data);
      }
    }).catch(error => {
      setErrMsg("Si è verificato un errore imprevisto");
      console.error("ERROR calling login api:", error);
    })
  ).onInvalid((errors) => {
    setErrMsg("Verifica i dati inseriti");
    console.warn("ERROR validating form data:", errors);
  });

  return (
    <>
      <PageTitle title="Login" />

      <PageContainer>

        <Title className="mb-6">Chabad CMS | Login page</Title>

        <form onSubmit={onSubmit} className="max-w-sm space-y-4">
          <Field>
            <Label>Email</Label>
            <Description>{error("email")}</Description>
            <Input {...register("email")} />
          </Field>

          <Field>
            <Label>Password</Label>
            <Description>{error("password")}</Description>
            <Input {...register("password")} type="password" />
          </Field>

          <Text className="block text-red-600 dark:text-red-400">{errMsg}</Text>

          <TextLink className="block" to={routes.auth.forgotPassword.href()}>
            Hai dimenticato la password?
          </TextLink>
          
          <SubmitButton text="Login" loading={loading} color="blue" />
        </form>
      </PageContainer>
    </>
  );
}
