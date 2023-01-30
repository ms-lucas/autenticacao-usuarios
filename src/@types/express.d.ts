declare namespace Express {
  export interface Request {
    user: {
      id: string;
      name: string;
      short_name: string;
      email: string;
    };
  }
}
