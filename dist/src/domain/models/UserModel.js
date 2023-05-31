"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
class UserModel {
    constructor(id) {
        this.id = id;
    }
    equals(entity) {
        if (!(entity instanceof UserModel))
            return false;
        return this.id === entity.id;
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map