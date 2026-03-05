import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
export declare class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
export declare const logger: (req: Request, res: Response, next: NextFunction) => void;
export declare class PreAuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
