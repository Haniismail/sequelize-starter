"use strict";
import { Model } from "sequelize";

export default interface KeystoreAttributes {
  client: string;
  primaryKey: string;
  secondaryKey: string;
  status: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Keystore
    extends Model<KeystoreAttributes>
    implements KeystoreAttributes
  {
     
    client!: string;
    primaryKey!: string;
    secondaryKey!: string;
    status!: boolean;
    static associate(models: any) {
        
    }
  }
  Keystore.init(
    {
      client: DataTypes.STRING,
      primaryKey: DataTypes.STRING,
      secondaryKey: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Keystore",
    }
  );
  return Keystore;
};

//change the model to a ts model
// make sure the association is Keystore HasMany(Admin) and Admin HasOne(Keystore)
//migrate
