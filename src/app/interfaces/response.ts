import { User } from "./user";

export interface Response {
  id: number;
  ticket_id: string;
  user_id: string;
  message: string;
  is_support: boolean;
  created_at: Date;
  updated_at: Date;
  user?: User;
}