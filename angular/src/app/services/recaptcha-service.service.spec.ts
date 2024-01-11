import { TestBed } from '@angular/core/testing';

import { RecaptchaServiceService } from './recaptcha-service.service';

describe('RecaptchaServiceService', () => {
  let service: RecaptchaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecaptchaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
