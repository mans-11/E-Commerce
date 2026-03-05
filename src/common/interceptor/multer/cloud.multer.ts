import {
  applyDecorators,
  BadRequestException,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

export interface ImageUploadOptions {
  fieldName?: string;
  destination?: string;
  maxFileSize?: number;
  maxCount?: number;
  allowedMimeTypes?: string[];
}

export function UploadImage(options: ImageUploadOptions = {}) {
  const {
    fieldName = "file",
    destination = "./src/uploads",
    maxFileSize = 5 * 1024 * 1024,
    allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"],
  } = options;

  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination,
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + "-" + Math.floor(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const fileName = `${fieldName}-${uniqueSuffix}${ext}`;
            cb(null, fileName);
          },
        }),
        limits: {
          fileSize: maxFileSize,
        },
        fileFilter: (req, file, cb) => {
          if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(
              new BadRequestException("Only image files are allowed"),
              false,
            );
          }
          cb(null, true);
        },
      }),
    ),
  );
}

export function UploadImages(options: ImageUploadOptions = {}) {
  const {
    fieldName = "files",
    destination = "./src/uploads",
    maxFileSize = 5 * 1024 * 1024,
    maxCount = 5,
    allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"],
  } = options;

  return applyDecorators(
    UseInterceptors(
      FilesInterceptor(fieldName, maxCount, {
        storage: diskStorage({
          destination,
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + "-" + Math.floor(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const fileName = `${fieldName}-${uniqueSuffix}${ext}`;
            cb(null, fileName);
          },
        }),
        limits: {
          fileSize: maxFileSize,
        },
        fileFilter: (req, file, cb) => {
          if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(
              new BadRequestException("Only image files are allowed"),
              false,
            );
          }
          cb(null, true);
        },
      }),
    ),
  );
}
