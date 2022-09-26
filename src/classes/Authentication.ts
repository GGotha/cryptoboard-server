import jwt from "jsonwebtoken";

export default class Authentication {
  public static generateToken({ userId }) {
    return jwt.sign({ sub: { userId } }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIME,
    });
  }
}
