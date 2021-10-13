import { Request, Response } from 'express';
import { VaultDto } from './vault.dto';
import { IFilterVault, VaultService } from './vault.service';
import { DataResponse } from '../core/utils/data-response.util';
import { ErrorResponse } from '../core/utils/error-response.util';
import { validateDataOrReject } from '../core/utils/data-validation.util';

export class VaultController {
  private readonly vaultService: VaultService;

  constructor() {
    this.vaultService = new VaultService();
  }

  async get(req: Request, res: Response) {
    try {
      const { name, date_start, date_end } = req.query;

      const result = await this.vaultService.get({
        name,
        date_start,
        date_end,
      } as IFilterVault);
      new DataResponse(result, res).send();
    } catch (error) {
      new ErrorResponse(error, res).send();
    }
  }

  async insert(req: Request, res: Response) {
    try {
      const data = new VaultDto(req.body);
      await validateDataOrReject(data);

      const result = await this.vaultService.insert(data);
      new DataResponse(result, res).send();
    } catch (error) {
      new ErrorResponse(error, res).send();
    }
  }
}
