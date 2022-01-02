import { TestBed } from '@angular/core/testing';

import { EventVenueService } from './event-venue.service';

describe('EventVenueService', () => {
  let service: EventVenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventVenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
