import { TestBed } from '@angular/core/testing';

import { PartitaService } from './partita.service';

describe('PartitaService', () => {
  let service: PartitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
