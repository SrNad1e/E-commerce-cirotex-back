import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { LocalAuthGuard } from "src/guards/local.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { CreateUserDTO } from "src/users/dtos/create-user-dto";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { Roles } from "./decorators/roles.decorator";
import { Role } from "./enums/role.enum";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post("/register")
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.createUser(createUserDTO);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req) {

    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get("/user")
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get("/admin")
  getDashboard(@Request() req) {
    return req.user;
  }
}
