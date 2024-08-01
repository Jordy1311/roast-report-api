import { UserTokenPayload } from "./models/User";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserTokenPayload;
    }
  }
}
