import { TestBed } from '@angular/core/testing';

import { CardsVisibleService } from './cards-visible.service';

describe('CardsVisibleService', () => {
  let service: CardsVisibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsVisibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
