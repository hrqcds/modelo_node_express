import { z } from "zod";

export const AuthUserSchema = z.object({
  control: z.string().min(6).max(255),
  password: z.string().min(10).max(255),
});

export type AuthRequestUserDto = z.infer<typeof AuthUserSchema>;

export type AuthResponseUserDto = {
  token: string;
  user: {
    name: string;
    role: string;
  };
};
