import { IEntity } from "domain/shared/IEntity";


export class UserModel implements IEntity {
     id?: number


    constructor(
        id?: number
    ) {
        this.id = id;
    }
    equals(entity: IEntity): boolean {
        if (!(entity instanceof UserModel)) return false;
        return this.id === entity.id;
      }
}