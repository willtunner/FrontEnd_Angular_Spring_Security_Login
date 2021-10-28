
import { User } from './../models/User';

export interface CustomUserResponse {
  timeStamp: Date;
  statusCode: number;
  reason: string;
  message: string;
  developerMessage: string;
  dataUser: { users?: User[], user?: User }
}