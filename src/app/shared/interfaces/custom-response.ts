import { Server } from "./server";
import { User } from './../models/User';

export interface CustomResponse {
  timeStamp: Date;
  statusCode: number;
  reason: string;
  message: string;
  developerMessage: string;
  data: { servers?: Server[], server?: Server };
  dataUser: { users?: User, user?: User;}
}
