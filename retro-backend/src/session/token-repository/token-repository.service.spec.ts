import { Test, TestingModule } from '@nestjs/testing';
import { TokenRepositoryService } from './token-repository.service';

describe('TokenRepositoryService', () => {
  let service: TokenRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenRepositoryService],
    }).compile();

    service = module.get<TokenRepositoryService>(TokenRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
