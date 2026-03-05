import type { Request } from "express";
import { AppService } from "./app.service";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello({ search, filter }: {
        search: string;
        filter: string;
    }): string;
    getProducte(req: Request): string;
}
