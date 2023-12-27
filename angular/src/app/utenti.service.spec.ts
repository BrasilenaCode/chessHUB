import { TestBed } from '@angular/core/testing';

import { UtentiService } from './utenti.service';

describe('UtentiService', () => {
  let service: UtentiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtentiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
