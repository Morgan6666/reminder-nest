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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ReminderUseCase_1 = require("../../application/use-cases/ReminderUseCase");
let RemController = class RemController {
    constructor(remUsecase) {
        this.remUsecase = remUsecase;
    }
    async getReminder() {
        const result = await this.remUsecase.reminde();
        return result;
    }
};
__decorate([
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemController.prototype, "getReminder", null);
RemController = __decorate([
    (0, swagger_1.ApiTags)("Reminder"),
    (0, common_1.Controller)("rem"),
    __metadata("design:paramtypes", [ReminderUseCase_1.RemUseCase])
], RemController);
exports.RemController = RemController;
//# sourceMappingURL=ReminderController.js.map