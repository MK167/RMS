import { TestBed } from '@angular/core/testing';

import { EventAttendanceService } from './event-attendance.service';

describe('EventAttendanceService', () => {
  let service: EventAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
