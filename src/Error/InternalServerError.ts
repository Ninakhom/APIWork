import { CustomError, CustomErrorContent } from "../Types/CustomError";

export default class InternalServerError extends CustomError {
  private static readonly _defaultStatusCode = 500;
  private readonly _statusCode: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: any };

  constructor(params?: {
    statusCode?: number;
    message?: string;
    logging?: boolean;
    context?: { [key: string]: any };
  }) {
    const { statusCode, message, logging, context } = params || {};

    super(message || "Internal server error");
    this._statusCode = statusCode || InternalServerError._defaultStatusCode;
    this._logging = logging || true; // ควร Log เสมอเมื่อเกิด Internal Server Error
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
