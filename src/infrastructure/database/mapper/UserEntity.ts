import { UserModel } from "domain/models/UserModel";
import { Entity, EntitySchema } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export const UserEntity = new EntitySchema<UserModel>({
  name: "user",
  tableName: "users",
  columns: {
    ...BaseEntity,

    id: {
      type: Number,
    },
   
  },
});
