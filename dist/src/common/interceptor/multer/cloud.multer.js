"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImage = UploadImage;
exports.UploadImages = UploadImages;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
function UploadImage(options = {}) {
    const { fieldName = "file", destination = "./src/uploads", maxFileSize = 5 * 1024 * 1024, allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"], } = options;
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)(fieldName, {
        storage: (0, multer_1.diskStorage)({
            destination,
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + "-" + Math.floor(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const fileName = `${fieldName}-${uniqueSuffix}${ext}`;
                cb(null, fileName);
            },
        }),
        limits: {
            fileSize: maxFileSize,
        },
        fileFilter: (req, file, cb) => {
            if (!allowedMimeTypes.includes(file.mimetype)) {
                return cb(new common_1.BadRequestException("Only image files are allowed"), false);
            }
            cb(null, true);
        },
    })));
}
function UploadImages(options = {}) {
    const { fieldName = "files", destination = "./src/uploads", maxFileSize = 5 * 1024 * 1024, maxCount = 5, allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"], } = options;
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)(fieldName, maxCount, {
        storage: (0, multer_1.diskStorage)({
            destination,
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + "-" + Math.floor(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const fileName = `${fieldName}-${uniqueSuffix}${ext}`;
                cb(null, fileName);
            },
        }),
        limits: {
            fileSize: maxFileSize,
        },
        fileFilter: (req, file, cb) => {
            if (!allowedMimeTypes.includes(file.mimetype)) {
                return cb(new common_1.BadRequestException("Only image files are allowed"), false);
            }
            cb(null, true);
        },
    })));
}
//# sourceMappingURL=cloud.multer.js.map