import { UserModel } from "domain/models/UserModel";
import { BaseRepository } from "./BaseRepository";
import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { IRemRepository } from "application/ports/IReminderRepository";
import { UserEntity } from "../mapper/UserEntity";


@Injectable()
export class RemRepository extends BaseRepository<UserModel>
implements IRemRepository{
    connection: Connection;
    constructor(
        @InjectConnection() connection: Connection,
      ) {
        super(connection, UserEntity);
        this.connection = connection;
      }

        async getUserInfo(id: number) {
            const result = await this.connection.query(`SELECT first_name, last_name, email FROM users WHERE id = ${id} AND is_doc=false;`);
            if(result){
                const data = result[0];
                return result;
                
            }
            else{
                return null;
            }   
      }

       async getDoctorInfo(id: number) {
            const result = await this.connection.query(
                `SELECT
                u.first_name,
                u.last_name,
                u.email,
                s.name as spec_name
            FROM users u
            INNER JOIN doc_meta dm on u.id = dm.doc_id
            INNER JOIN specialisation s on s.id = dm.spec_id
            
            WHERE u.id = ${id}`
                
            );
            if(result){
                const data = result[0];
                return data
            }
            else{
                return null;
            }   
      }
    }