import { Test, TestingModule } from '@nestjs/testing';
import { ContainerRepositoryService } from './container-repository.service';

describe('ContainerRepositoryService', () => {
  let service: ContainerRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContainerRepositoryService],
    }).compile();

    service = module.get<ContainerRepositoryService>(ContainerRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
