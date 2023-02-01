import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/users/users.module";
import { LocalStrategy } from "./local.auth";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserSchema } from "src/users/schemas/users.schema";
import { JwtStrategy } from "src/strategies/jwt.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
    MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
