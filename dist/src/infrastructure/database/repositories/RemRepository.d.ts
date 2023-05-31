import { UserModel } from "domain/models/UserModel";
import { BaseRepository } from "./BaseRepository";
import { Connection } from "typeorm";
import { IRemRepository } from "application/ports/IReminderRepository";
export declare class RemRepository extends BaseRepository<UserModel> implements IRemRepository {
    connection: Connection;
    constructor(connection: Connection);
    getUserInfo(id: number): Promise<any>;
    getDoctorInfo(id: number): Promise<any>;
}
