import { TestBed } from '@angular/core/testing';

import { SessionHttpService } from './session-http.service';

describe('SessionHttpService', () => {
  let service: SessionHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
