import {TestBed} from '@angular/core/testing';

import {UtilService} from './util.service';
import {TimeRange} from "../../interfaces/DateRange";

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
