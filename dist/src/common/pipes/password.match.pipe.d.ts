import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class PasswordMatchPipe implements PipeTransform {
    constructor();
    transform(value: any, metadata: ArgumentMetadata): any;
}
