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
exports.BaseRepository = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
let BaseRepository = class BaseRepository {
    model;
    request;
    constructor(model, request) {
        this.model = model;
        this.request = request;
    }
    async create(data) {
        return await this.model.create({
            ...data,
            createdBy: this.request?.user?._id,
        });
    }
    async findAll(populate) {
        const query = this.model.find();
        if (populate)
            query.populate(populate);
        const items = await query;
        if (!items.length)
            throw new common_1.NotFoundException("Items Not Found");
        return items;
    }
    async findOne(id, populate) {
        const query = this.model.findById(id);
        if (populate)
            query.populate(populate);
        const item = await query;
        if (!item)
            throw new common_1.NotFoundException("Item Not Found");
        return item;
    }
    async updateById(id, data, populate) {
        const query = this.model.findByIdAndUpdate(id, data, { new: true });
        if (populate)
            query.populate(populate);
        const item = await query;
        if (!item)
            throw new common_1.NotFoundException("Item Not Found");
        return item;
    }
    async deleteById(id) {
        const item = await this.model.findByIdAndDelete(id);
        if (!item)
            throw new common_1.NotFoundException("Item Not Found");
    }
};
exports.BaseRepository = BaseRepository;
exports.BaseRepository = BaseRepository = __decorate([
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], BaseRepository);
//# sourceMappingURL=base-repository.js.map