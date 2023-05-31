"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RemUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemUseCase = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const IReminderRepository_1 = require("../ports/IReminderRepository");
const appointment_schema_1 = require("../../infrastructure/schemas/appointment.schema");
const ServiceResponse_1 = require("../../infrastructure/utils/ServiceResponse");
const mongoose_2 = require("mongoose");
const fs = require("fs");
let RemUseCase = RemUseCase_1 = class RemUseCase {
    constructor(appModel, remRepo) {
        this.appModel = appModel;
        this.remRepo = remRepo;
        this.logger = new common_1.Logger(RemUseCase_1.name);
        this.serviceRes = new ServiceResponse_1.ServiceResponse();
    }
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
            if (new Date(result[i].time_received).getHours() -
                currentTime.getHours() ===
                2) {
                this.logger.log("Отправляем сообщение");
                fs.writeFileSync(FILE_PATH, `${currentTime} | Привет ${user.first_name}! Вам через 2 часа к ${doc.spec_name} в ${result[i].time_received}!`);
            }
            else if (new Date(result[i].time_received).getDay() - currentTime.getDay() ===
                1) {
                fs.writeFileSync(FILE_PATH, `${currentTime} | Привет ${user.first_name}! Напоминаем что вы записаны к ${doc.spec_name} завтра в ${result[i].time_received}!`);
            }
            else {
                this.logger.log(`Текущих записей нет`);
                return this.serviceRes.recordDoesntExist();
            }
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('* * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemUseCase.prototype, "reminde", null);
RemUseCase = RemUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        IReminderRepository_1.IRemRepository])
], RemUseCase);
exports.RemUseCase = RemUseCase;
//# sourceMappingURL=ReminderUseCase.js.map