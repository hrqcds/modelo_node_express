import { User } from "../../../models/user";

export type ListUserResponse = {
  data: User[];
  total: number;
};
