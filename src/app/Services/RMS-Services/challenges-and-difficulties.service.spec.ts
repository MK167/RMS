import { TestBed } from '@angular/core/testing';

import { ChallengesAndDifficultiesService } from './challenges-and-difficulties.service';

describe('ChallengesAndDifficultiesService', () => {
  let service: ChallengesAndDifficultiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengesAndDifficultiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
