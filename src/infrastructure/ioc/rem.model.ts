import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { IRemRepository } from "application/ports/IReminderRepository";
import { RemUseCase } from "application/use-cases/ReminderUseCase";
import { RemRepository } from "infrastructure/database/repositories/RemRepository";
import {
  Appointment,
  AppointmentSchema,
} from "infrastructure/schemas/appointment.schema";
import { Record, RecordSchema } from "infrastructure/schemas/record.schema";
import { RemController } from "presentation/controllers/ReminderController";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot("mongodb://localhost:27017"),
    MongooseModule.forFeature([
      { name: Record.name, schema: RecordSchema },
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
  controllers: [RemController],
  providers: [
    RemUseCase,
    {provide: IRemRepository, useClass: RemRepository}
  ],
  
})
export class RemModule {}
