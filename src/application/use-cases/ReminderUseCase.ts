import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cron } from "@nestjs/schedule";
import { IRemRepository } from "application/ports/IReminderRepository";
import {
  Appointment,
  AppointmentDocument,
} from "infrastructure/schemas/appointment.schema";
import { Record, RecordDocumnet } from "infrastructure/schemas/record.schema";
import { ServiceResponse } from "infrastructure/utils/ServiceResponse";
import { Model } from "mongoose";
import { registerCustomQueryHandler } from "puppeteer";
const fs = require("fs");

@Injectable()
export class RemUseCase {
  private readonly logger = new Logger(RemUseCase.name);
  public serviceRes = new ServiceResponse();
  constructor(
    @InjectModel(Appointment.name) private appModel: Model<AppointmentDocument>,
    private readonly remRepo: IRemRepository
  ) {}

  @Cron('* * * * * *')
  async reminde() {
    const currentTime = new Date();
    this.logger.log(`Получаем данные записей пользователя`);
    const result = await this.appModel.find({ done: false });
    for (let i = 0; i < result.length; i++) {
      this.logger.log(`Получаем информация о пользователе`);
      const user = await this.remRepo.getUserInfo(result[i].user_id);
      const doc = await this.remRepo.getDoctorInfo(result[i].doc_id);
      console.log(result[i].time_received);
      console.log(new Date(result[i].time_received).getHours());
      console.log(currentTime);
      console.log(currentTime.getHours());
      if (
        new Date(result[i].time_received).getHours() -
          currentTime.getHours() ===
        2
      ) {
        this.logger.log("Отправляем сообщение");
        fs.writeFileSync(
          FILE_PATH,
          `${currentTime} | Привет ${user.first_name}! Вам через 2 часа к ${doc.spec_name} в ${result[i].time_received}!`
          
        );
      } else if (
        new Date(result[i].time_received).getDay() - currentTime.getDay() ===
        1
      ) {
        fs.writeFileSync(
          FILE_PATH,
          `${currentTime} | Привет ${user.first_name}! Напоминаем что вы записаны к ${doc.spec_name} завтра в ${result[i].time_received}!`
        );
      } else {
        this.logger.log(`Текущих записей нет`);
        return this.serviceRes.recordDoesntExist();
      }
    }
  }
}
