import { CustomError, CustomErrorContent } from "../Types/CustomError";

export default class ForbiddenError extends CustomError {
  private static readonly _defaultStatusCode = 403;
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

    super(message || "Forbidden action");
    this._statusCode = statusCode || ForbiddenError._defaultStatusCode;
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
