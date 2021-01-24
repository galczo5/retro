import { Test, TestingModule } from '@nestjs/testing';
import { CardRepositoryService } from './card-repository.service';

describe('CardRepositoryService', () => {
  let service: CardRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardRepositoryService],
    }).compile();

    service = module.get<CardRepositoryService>(CardRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
