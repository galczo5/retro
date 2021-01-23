import { TestBed } from '@angular/core/testing';

import { SessionHashService } from './session-hash.service';

describe('SessionHashService', () => {
  let service: SessionHashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionHashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
