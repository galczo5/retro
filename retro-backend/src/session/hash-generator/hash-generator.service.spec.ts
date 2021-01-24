import { Test, TestingModule } from '@nestjs/testing';
import { HashGeneratorService } from './hash-generator.service';

describe('HashGeneratorService', () => {
  let service: HashGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashGeneratorService],
    }).compile();

    service = module.get<HashGeneratorService>(HashGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
