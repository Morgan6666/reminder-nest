import { IEntity } from "domain/shared/IEntity";
export declare class UserModel implements IEntity {
    id?: number;
    constructor(id?: number);
    equals(entity: IEntity): boolean;
}
