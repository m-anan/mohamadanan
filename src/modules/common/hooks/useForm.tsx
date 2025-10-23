import { TypeOf, ZodSchema } from "zod";
import {
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// We provide additional option that would be our zod schema.
interface UseFormProps<T extends ZodSchema<any>>
  extends UseHookFormProps<TypeOf<T>> {
  schema: T;
}

export const useForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseFormProps<T>) => {
  return useHookForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
};
