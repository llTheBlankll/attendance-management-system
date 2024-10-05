import { TestBed } from '@angular/core/testing';

import { GradeLevelService } from './grade-level.service';

describe('GradeLevelService', () => {
  let service: GradeLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
