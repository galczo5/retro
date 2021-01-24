import { HttpException, Injectable } from '@nestjs/common';
import { SessionRepositoryService } from '../session-repository/session-repository.service';
import { TokenRepositoryService } from '../token-repository/token-repository.service';

@Injectable()
export class UserAuthService {

  constructor(private readonly sessionRepositoryService: SessionRepositoryService,
              private readonly tokenRepositoryService: TokenRepositoryService) {
  }

  async throwIfNotAllowed(hash: string, token: string): Promise<void> {
    const isAllowed = await this.tokenRepositoryService.validate(hash, token);
    if (!isAllowed) {
      throw new HttpException('Not allowed', 401)
    }
  }

}
