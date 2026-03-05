import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class PasswordMatchPipe implements PipeTransform {
  constructor() {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === "body") {
      const { password, confirmPassword } = value;
      if (password !== confirmPassword)
        throw new BadRequestException("password and confirmpassword mimatch");
    }
    return value;
  }
}
