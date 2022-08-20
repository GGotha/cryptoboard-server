declare namespace Express {
  export interface Request {
    userId: number;
    user?: Record<string, any>;
  }
}
