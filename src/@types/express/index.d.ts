declare namespace Express {
  export interface Request {
    userId: any;
    user?: Record<string, any>;
  }
}
