"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const IReminderRepository_1 = require("../../application/ports/IReminderRepository");
const ReminderUseCase_1 = require("../../application/use-cases/ReminderUseCase");
const RemRepository_1 = require("../database/repositories/RemRepository");
const appointment_schema_1 = require("../schemas/appointment.schema");
const record_schema_1 = require("../schemas/record.schema");
const ReminderController_1 = require("../../presentation/controllers/ReminderController");
let RemModule = class RemModule {
};
RemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forRoot("mongodb://localhost:27017"),
            mongoose_1.MongooseModule.forFeature([
                { name: record_schema_1.Record.name, schema: record_schema_1.RecordSchema },
                { name: appointment_schema_1.Appointment.name, schema: appointment_schema_1.AppointmentSchema },
            ]),
        ],
        controllers: [ReminderController_1.RemController],
        providers: [
            ReminderUseCase_1.RemUseCase,
            { provide: IReminderRepository_1.IRemRepository, useClass: RemRepository_1.RemRepository }
        ],
    })
], RemModule);
exports.RemModule = RemModule;
//# sourceMappingURL=rem.model.js.map