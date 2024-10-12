import { TestBed } from '@angular/core/testing';

import { StrandService } from './strand.service';

describe('StrandService', () => {
  let service: StrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
