import { z } from "zod";
export const QueryUserSchema = z.object({
  skip: z.number().or(z.coerce.number()),
  take: z.number().or(z.coerce.number()),
  role: z.enum(["adm", "operator", "tecnico"]).optional(),
  profile: z.string().optional(),
  active: z.enum(["true", "false"]).optional(),
});

export type QueryUserDto = z.infer<typeof QueryUserSchema>;
