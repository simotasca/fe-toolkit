import { useState } from "react";
import { type z } from "zod";
import { useObjectState } from "../state/object/useObject";

type SubmitHandler<T extends z.ZodObject> = {
  (data: z.infer<T>): void | Promise<any>;
};
export type RegisterFunction<T> = (name: keyof T, valueFn?: (v: any) => string | null | undefined) => {
  "data-form-error"?: string;
  onChange(e: any): void;
  value: any;
  disabled?: boolean;
};
export type ControlFunction<T> = {
  <K extends keyof T>(field: K): {
    setValue: (v: T[K]) => void;
    value: Partial<T>[K];
    loading: boolean;
    error?: z.core.$ZodIssue;
  };
};

type UseFormOptions<ValidatorInput> = {
  defaults?: Partial<ValidatorInput>;
};

export function useForm<T extends z.ZodObject>(validator: T, options?: UseFormOptions<z.core.input<T>>) {
  type Input = z.core.input<T>;
  const [fields, fieldsActions] = useObjectState<Partial<Input>>(options?.defaults /*|| getDefaults(validator)*/ || {});
  const [loading, setLoading] = useState(false);
  const [errors, errorsActions] = useObjectState<Record<string | number | symbol, z.core.$ZodIssue | undefined>>({});
  const register: RegisterFunction<Partial<Input>> = (name, valueFn = (v) => String(v)) => {
    const field = fields[name];
    const value = field && valueFn(field) || "";
    return {
      "data-invalid": errors[name]?.message, // see Field component: src/components/ui/form/Field.tsx 
      value,
      checked: !!fields[name] || false,
      disabled: loading,
      name,
      onChange: (e) => {
        if (e && e._reactName === "onChange") {
          let value: any;
          switch (e.target.type) {
            case "checkbox":
              value = e.target.checked;
              break;
            case "number":
              value = e.target.valueAsNumber;
              break;
            case "date":
            default:
              value = e.target.value;
              break;
          }
          fieldsActions.set(name, value);
        } else {
          fieldsActions.set(name, e);
        }
        errorsActions.setObject((prev) => {
          delete prev[name];
          return prev;
        });
      },
    };
  };

  function handleSubmit(fn: SubmitHandler<typeof validator>) {
    let errorHandler: ((errors: { [key: string | number | symbol]: z.core.$ZodIssue }) => void | Promise<void>) | undefined;
    const handler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = validator.safeParse(fields);
      errorsActions.setObject({});
      if (result.error) {
        let newErrors: { [key: string | number | symbol]: z.core.$ZodIssue } = {};
        result.error.issues.forEach((issue) => {
          issue.path.forEach((path) => (newErrors[path] = issue));
        });
        errorsActions.setObject(newErrors);
        errorHandler && (await errorHandler(newErrors));
        return;
      }
      setLoading(true);
      await fn(result.data);
      setLoading(false);
    };

    handler.onInvalid = function (errFn?: (errors: Record<string, z.core.$ZodIssue>) => void | Promise<void>) {
      errorHandler = errFn;
      return handler;
    };
    return handler;
  }

  const control: ControlFunction<Input> = <K extends keyof Input>(field: K) => ({
    setValue: (v: Input[K]) => fieldsActions.set(field, v),
    value: fields[field],
    error: errors[field],
    loading,
  });

  const safeSetError = (field: Exclude<Parameters<typeof fieldsActions.set>[0], symbol>, message: string | null) => 
    errorsActions.set(field, message === null ? undefined : { message, code: "custom", path: [field] } );
  const getErrorMessage = (field: Parameters<typeof fieldsActions.set>[0]) => errors[field]?.message;

  return { 
    register, control,
    handleSubmit,
    fields, 
    setField: fieldsActions.set,
    setFields: fieldsActions.setObject,
    loading,
    errors, getError: getErrorMessage, setError: safeSetError, setErrors: errorsActions.setObject
  };
}