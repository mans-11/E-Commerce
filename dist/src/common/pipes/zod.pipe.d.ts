import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import type { ZodSchema } from "zod";
export declare class ZodPipe implements PipeTransform {
    private schema;
    constructor(schema: ZodSchema);
    transform(value: any, metadata: ArgumentMetadata): unknown;
}
