import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3).max(255),
  registration: z.string().min(3).max(255),
  control: z.string().min(3).max(255),
  password: z.string().min(3).max(255),
  profile: z.string().min(3).max(255),
  role: z.enum(["adm", "operator", "tecnico"]),
});

export type CreateUserRequestDto = z.infer<typeof CreateUserSchema>;
