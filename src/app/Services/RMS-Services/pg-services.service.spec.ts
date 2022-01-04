import { TestBed } from '@angular/core/testing';

import { PGServicesService } from './pg-services.service';

describe('PGServicesService', () => {
  let service: PGServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PGServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
