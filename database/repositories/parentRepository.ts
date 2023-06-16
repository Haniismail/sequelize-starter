const db = require("../models/index");
import ParentAttributesWithId from "../../types/ProvisionalParentAttributes";
export default class ParentRepo {
  public static async create(
    obj: ParentAttributesWithId
  ): Promise<ParentAttributesWithId> {
    const parent = await db.parents.create(obj);
    return parent;
  }
  public static async findAll(obj: Object): Promise<ParentAttributesWithId[]> {
    return await db.parents.findAll(obj);
  }
  public static async findByPk(
    id: number
  ): Promise<ParentAttributesWithId | null> {
    return await db.parents.findByPk(id);
  }
  public static async findOneByObj(
    obj: Object
  ): Promise<ParentAttributesWithId> {
    return await db.parents.findOne(obj);
  }
  public static async findOne(
    obj: Object
  ): Promise<ParentAttributesWithId | null> {
    return await db.parents.findOne(obj);
  }
  public static async destroy(
    obj: Object
  ): Promise<ParentAttributesWithId | null> {
    return await db.parents.destroy(obj);
  }

  public static async update(
    obj: Object,
    obj2: Object
  ): Promise<ParentAttributesWithId | null> {
    return await db.parents.update(obj, obj2);
  }
}
