import { TestBed } from '@angular/core/testing';

import { StudentSchedulesService } from './student-schedules.service';

describe('StudentSchedulesService', () => {
  let service: StudentSchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentSchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
