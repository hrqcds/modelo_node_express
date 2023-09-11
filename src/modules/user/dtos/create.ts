import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3).max(255),
  registration: z.string().min(3).max(255).regex(/^\d+$/),
  control: z.string().min(6).max(255).regex(/^\d+$/),
  password: z
    .string()
    .min(10)
    .max(255)
    .regex(/^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{10,30}$/),
  profile: z.string().min(3).max(255),
  role: z.enum(["adm", "operator", "tecnico"]),
});

export type CreateUserRequestDto = z.infer<typeof CreateUserSchema>;
