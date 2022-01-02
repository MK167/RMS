import { TestBed } from '@angular/core/testing';

import { EnviroService } from './enviro.service';

describe('EnviroService', () => {
  let service: EnviroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
