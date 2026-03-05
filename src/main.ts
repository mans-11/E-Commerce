import { NestFactory } from "@nestjs/core";
import * as express from "express";
import { AppModule } from "./app.module";
import { logger } from "./middleware/logger.midddleware";

async function bootstrap() {
  const port = process.env.PORT || 447;
  const app = await NestFactory.create(AppModule);
  app.use("/upload", express.static("./src/uploads"));
  app.use(logger);
  await app.listen(port, () => {
    console.log(`Server Is Runing On http://localhost:: ::${port}`);
  });
}
bootstrap();
