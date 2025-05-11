import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required!"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(12, "Password must be 12 characters long")
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
