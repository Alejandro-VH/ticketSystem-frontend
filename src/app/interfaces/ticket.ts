import { User } from "./user";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'closed';
  created_at: Date;
  updated_at: Date;
  user?: User;
}
