import {TestBed} from '@angular/core/testing';

import {FirebaseStorageService} from './firebase-storage.service';

describe('FirebaseStorageService', () => {
  let service: FirebaseStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
