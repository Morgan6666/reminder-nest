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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const UserEntity_1 = require("../mapper/UserEntity");
let RemRepository = class RemRepository extends BaseRepository_1.BaseRepository {
    constructor(connection) {
        super(connection, UserEntity_1.UserEntity);
        this.connection = connection;
    }
    async getUserInfo(id) {
        const result = await this.connection.query(`SELECT first_name, last_name, email FROM users WHERE id = ${id} AND is_doc=false;`);
        if (result) {
            const data = result[0];
            return result;
        }
        else {
            return null;
        }
    }
    async getDoctorInfo(id) {
        const result = await this.connection.query(`SELECT
                u.first_name,
                u.last_name,
                u.email,
                s.name as spec_name
            FROM users u
            INNER JOIN doc_meta dm on u.id = dm.doc_id
            INNER JOIN specialisation s on s.id = dm.spec_id
            
            WHERE u.id = ${id}`);
        if (result) {
            const data = result[0];
            return data;
        }
        else {
            return null;
        }
    }
};
RemRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], RemRepository);
exports.RemRepository = RemRepository;
//# sourceMappingURL=RemRepository.js.map