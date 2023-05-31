import { IRemRepository } from "application/ports/IReminderRepository";
import { AppointmentDocument } from "infrastructure/schemas/appointment.schema";
import { ServiceResponse } from "infrastructure/utils/ServiceResponse";
import { Model } from "mongoose";
export declare class RemUseCase {
    private appModel;
    private readonly remRepo;
    private readonly logger;
    serviceRes: ServiceResponse;
    constructor(appModel: Model<AppointmentDocument>, remRepo: IRemRepository);
    reminde(): Promise<{
        Success: boolean;
        Message: string;
        Code: number;
    }>;
}
