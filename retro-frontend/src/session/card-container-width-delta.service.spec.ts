import { TestBed } from '@angular/core/testing';

import { CardContainerWidthDeltaService } from './card-container-width-delta.service';

describe('CardContainerWidthDeltaService', () => {
  let service: CardContainerWidthDeltaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardContainerWidthDeltaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
