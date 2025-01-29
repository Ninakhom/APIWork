import { CustomError, CustomErrorContent } from "../Types/CustomError";
export default class BadRequestError extends CustomError {
  private static readonly _defaultstatusCode = 400;
  private readonly _statusCode: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params?: {
    code?: number;
    message?: string;
    logging?: boolean;
    context?: { [key: string]: any };
  }) {
    const { code, message, logging, context } = params || {};
    super(message || "Bad request");
    this._statusCode = code || BadRequestError._defaultstatusCode;
    this._logging = logging || false;
    this._context = context || {};
  }

  get errors(): CustomErrorContent[] {
    return [{ message: this.message, context: this._context }];
  }
  get statusCode(): number {
    return this._statusCode;
  }
  get logging(): boolean {
    return this._logging;
  }
}
