import { Injectable } from "@nestjs/common";



@Injectable()
export abstract class IRem<Entity>{
    abstract getUserInfo(id: number);
    abstract getDoctorInfo(id: number);
}