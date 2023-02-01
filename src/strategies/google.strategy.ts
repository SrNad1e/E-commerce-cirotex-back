import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

import { Injectable } from "@nestjs/common";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID:
        "687571876952-aurmb6hk60gm6c7tua8fhdohmahf775p.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/redirect",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
