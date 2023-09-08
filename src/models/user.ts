export type User = {
  id: string;
  name: string;
  registration: string;
  control: string;
  password: string;
  profile: string;
  role: string;
  active: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
};
