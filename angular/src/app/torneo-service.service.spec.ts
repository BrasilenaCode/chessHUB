import { TestBed } from '@angular/core/testing';

import { TorneoServiceService } from './torneo-service.service';

describe('TorneoServiceService', () => {
  let service: TorneoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorneoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
