import bcrypt from "bcrypt";

export async function EncryptPassword(password: string): Promise<string> {
  return bcrypt.hashSync(password, 10);
}

export async function DecryptPassword(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compareSync(password, passwordHash);
}
