import { TestBed } from '@angular/core/testing';

import { UserAttendService } from './user-attend.service';

describe('UserAttendService', () => {
  let service: UserAttendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAttendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
