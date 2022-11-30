import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { DownloadContractCommand } from '../command/contract.command';
import { Request, Response } from 'express';
import * as fs from 'fs';

/* istanbul ignore next */
@Controller('contract')
export class ContractController {
  @Post('download')
  async getFile(
    @Body() body: DownloadContractCommand,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const path = `customers/${req.cookies.customerId}/${body.id}/${req.cookies.customerId}_${body.id}_signed`;
    if (fs.existsSync(`${path}.pdf`)) {
      return res.download(`${path}.pdf`);
    }
    if (fs.existsSync(`${path}.png`)) {
      return res.download(`${path}.png`);
    }
    if (fs.existsSync(`${path}.jpg`)) {
      return res.download(`${path}.jpg`);
    }
    if (fs.existsSync(`${path}.jpeg`)) {
      return res.download(`${path}.jpeg`);
    }
  }
}
