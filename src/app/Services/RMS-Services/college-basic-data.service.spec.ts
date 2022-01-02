import { TestBed } from '@angular/core/testing';

import { CollegeBasicDataService } from './college-basic-data.service';

describe('CollegeBasicDataService', () => {
  let service: CollegeBasicDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeBasicDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
