import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDTO } from "./dtos/create-user-dto";
import { UserDocument } from "./schemas/users.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("user") private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(CreateUserDTO: CreateUserDTO) {
    const newUser = await this.userModel.create(CreateUserDTO);
    if (newUser) {
      newUser.password = await bcrypt.hash(newUser.password, 10);
    } else {
      throw new Error("No se estan mandando todos los campos");
    }
    return newUser.save();
  }

  async getUser(username: string) {
    return await this.userModel.findOne({ username: username });
  }
}
