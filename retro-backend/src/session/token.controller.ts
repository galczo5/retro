import { Body, Controller, HttpException, Param, Post } from '@nestjs/common';
import { TokenRepositoryService } from './token-repository/token-repository.service';

@Controller('token')
export class TokenController {

  constructor(private readonly repositoryService: TokenRepositoryService) {
  }

  @Post('auth/:id')
  async getToken(@Param('id') sessionHash: string, @Body() body: { secret: string }) {
    try {
      const token = await this.repositoryService.getToken(sessionHash, body.secret);
      return {
        token: token,
        hash: sessionHash
      };
    } catch (e) {
      throw new HttpException(e, 401);
    }
  }

}
