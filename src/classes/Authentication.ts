import jwt from "jsonwebtoken";

export default class Authentication {
  public static generateToken(content: object) {
    return jwt.sign(content, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME });
  }
}
