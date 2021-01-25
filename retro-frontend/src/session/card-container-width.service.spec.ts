import { TestBed } from '@angular/core/testing';

import { CardContainerWidthService } from './card-container-width.service';

describe('CardContainerWidthService', () => {
  let service: CardContainerWidthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardContainerWidthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
