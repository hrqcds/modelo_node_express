import { z } from "zod";

export const AuthUserSchema = z.object({
  registration: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
});

export type AuthRequestUserDto = z.infer<typeof AuthUserSchema>;

export type AuthResponseUserDto = {
  token: string;
  user: {
    name: string;
    role: string;
  };
};
