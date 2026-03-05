"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_path_1 = require("node:path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const brand_module_1 = require("./modules/brand/brand.module");
const cart_module_1 = require("./modules/cart/cart.module");
const category_module_1 = require("./modules/category/category.module");
const products_module_1 = require("./modules/products/products.module");
const user_module_1 = require("./modules/user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: (0, node_path_1.resolve)("./config/dev.env"),
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DB_URi, {
                serverSelectionTimeoutMS: 5000,
                onConnectionCreate(connection) {
                    connection.on("connected", () => {
                        console.log("MongoDB Connected Successfully");
                    });
                },
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            brand_module_1.BrandModule,
            category_module_1.CategoryModule,
            products_module_1.ProductsModule,
            cart_module_1.CartModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map