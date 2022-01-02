import { TestBed } from '@angular/core/testing';

import { AcademicStructureService } from './academic-structure.service';

describe('AcademicStructureService', () => {
  let service: AcademicStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
