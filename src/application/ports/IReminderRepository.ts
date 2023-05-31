
import { Injectable } from "@nestjs/common";
import { UserModel } from "domain/models/UserModel";
import { IRem } from "./IReminder";



@Injectable()
export abstract class IRemRepository extends IRem<UserModel> {}