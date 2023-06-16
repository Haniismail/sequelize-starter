const { Admin } = require("../models");
import AdminAttributesWithId from "../../types/ProvisionalAdminAttributes";
import KeystoreRepo from "./KeystoreRepo";
import KeystoreAttribute from "../models/keystore";
const db = require("../models/index");

export default class AdminRepo {
  public static async create(
    admin: AdminAttributesWithId,
    accessTokenKey: string,
    refreshTokenKey: string
  ): Promise<{ admin: AdminAttributesWithId; keystore: KeystoreAttribute }> {
    // create admin as createdAdmin
    const createdAdmin = await Admin.create(admin);
    //create the keystore which consists of the createdAdmin's ID, accessTokenKey, refreshTokenKey
    const keystore = await KeystoreRepo.create(
      createdAdmin.id,
      accessTokenKey,
      refreshTokenKey
    );
    return { admin: createdAdmin, keystore: keystore };
  }
  public static async findAll(obj: Object): Promise<AdminAttributesWithId[]> {
    return await db.Admin.findAll(obj);
  }
  public static async findOne(
    obj: Object
  ): Promise<AdminAttributesWithId | null> {
    return await db.Admin.findOne(obj);
  }
  public static async update(
    obj: Object,
    obj2: Object
  ): Promise<AdminAttributesWithId | null> {
    return await db.Admin.update(obj, obj2);
  }
}
