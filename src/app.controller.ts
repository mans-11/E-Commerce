import { Controller, Get, HttpCode, Query, Req } from "@nestjs/common";
import type { Request } from "express";
import { AppService } from "./app.service";

@Controller("")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("")
  @HttpCode(200)
  getHello(
    @Query() { search, filter }: { search: string; filter: string },
  ): string {
    console.log({ search, filter });
    return this.appService.getHello();
  }

  @Get("/get-product")
  getProducte(@Req() req: Request): string {
    console.log(req);
    return this.appService.getHello();
  }
}
