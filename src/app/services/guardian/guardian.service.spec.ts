import { TestBed } from '@angular/core/testing';

import { GuardianService } from './guardian.service';

describe('GuardianService', () => {
  let service: GuardianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
