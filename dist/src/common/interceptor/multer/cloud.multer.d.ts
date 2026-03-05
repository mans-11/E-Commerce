export interface ImageUploadOptions {
    fieldName?: string;
    destination?: string;
    maxFileSize?: number;
    maxCount?: number;
    allowedMimeTypes?: string[];
}
export declare function UploadImage(options?: ImageUploadOptions): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function UploadImages(options?: ImageUploadOptions): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
