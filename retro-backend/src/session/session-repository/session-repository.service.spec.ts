import { Test, TestingModule } from '@nestjs/testing';
import { SessionRepositoryService } from './session-repository.service';

describe('SessionRepositoryService', () => {
  let service: SessionRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionRepositoryService],
    }).compile();

    service = module.get<SessionRepositoryService>(SessionRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
