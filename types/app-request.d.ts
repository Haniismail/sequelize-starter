import { Request } from "express";
import AdminAttributesWithId from "./ProvisionalAdminAttributes";
import KeystoreAttribute from "../../models/keystore";

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: AdminAttributesWithId;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
