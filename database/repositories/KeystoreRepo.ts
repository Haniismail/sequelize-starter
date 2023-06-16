const { Keystore } = require("../models");
import KeystoreAttribute from "../models/keystore";
import AdminAttributesWithId from "../../types/ProvisionalAdminAttributes";

export default class KeystoreRepo {
  //find the keystore that has the client = admin attributes primaryKey and status true
  public static findforKey(
    client: AdminAttributesWithId,
    key: string
  ): Promise<KeystoreAttribute | null> {
    return Keystore.findOne({ client: client, primaryKey: key, status: true });
  }
  public static async remove(id: any): Promise<KeystoreAttribute | null> {
    // finds the keystore that has the current user's id and then deletes it
    //HARD DELETE
    return await Keystore.destroy({
      where: {
        id: id,
      },
    });
  }

  public static async create(
    client: AdminAttributesWithId,
    primaryKey: string,
    secondaryKey: string
  ): Promise<KeystoreAttribute> {
    //create the keystore
    const keystore = await Keystore.create({
      client: client,
      primaryKey: primaryKey,
      secondaryKey: secondaryKey,
    });

    return keystore;
  }
}
