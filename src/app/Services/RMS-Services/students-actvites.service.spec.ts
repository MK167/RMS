import { TestBed } from '@angular/core/testing';

import { StudentsActvitesService } from './students-actvites.service';

describe('StudentsActvitesService', () => {
  let service: StudentsActvitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsActvitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
