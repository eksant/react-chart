import { Request, Response } from 'express';
import { UserDto } from './auth.dto';
import { AuthService } from './auth.service';
import { DataResponse } from '../core/utils/data-response.util';
import { ErrorResponse } from '../core/utils/error-response.util';
import { validateDataOrReject } from '../core/utils/data-validation.util';

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
      const data = new UserDto(req.body);
      await validateDataOrReject(data);

      const result = await this.authService.login(data);
      new DataResponse(result, res).send();
    } catch (error) {
      new ErrorResponse(error, res).send();
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const result = await this.authService.logout({ id: req.auth?.id });
      new DataResponse(result, res).send();
    } catch (error) {
      new ErrorResponse(error, res).send();
    }
  }
}
