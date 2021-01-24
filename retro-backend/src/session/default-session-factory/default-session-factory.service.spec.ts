import { Test, TestingModule } from '@nestjs/testing';
import { DefaultSessionFactoryService } from './default-session-factory.service';

describe('DefaultSessionFactoryService', () => {
  let service: DefaultSessionFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultSessionFactoryService],
    }).compile();

    service = module.get<DefaultSessionFactoryService>(DefaultSessionFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
