interface ICustomError {
  message: string;
  statusCode: number;
}

class CustomError {
  public readonly message: string;

  public readonly statusCode: number;

  public constructor({ message, statusCode }: ICustomError) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default CustomError;
