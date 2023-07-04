import bcrypt from "bcrypt";
import prisma from "@prisma/client";

export default class User {
  constructor(username, email, hashedPassword) {
    this.username = username;
    this.email = email;
    this.hashedPassword = hashedPassword;
  }

  static async fromJson(json) {
    const { username, email, password } = json;
    const hashedPassword = await bcrypt.hash(password, 8);

    return new User(username, email, hashedPassword);
  }

  async registerInDb() {
    const dbConnect = new prisma.PrismaClient();

    const createdUser = dbConnect.user.create({
      data: {
        username: this.username,
        email: this.email,
        password: this.hashedPassword,
      },
    });
    console.log("createdUser ", createdUser);
    return createdUser;
  }
}
