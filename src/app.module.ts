import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GoogleStrategy } from "./strategies/google.strategy";
import { UserModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://srnadie:hotpersuitfifa15@cluster0.hmalzwg.mongodb.net/?retryWrites=true&w=majority",
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, AppController],
})
export class AppModule {}
