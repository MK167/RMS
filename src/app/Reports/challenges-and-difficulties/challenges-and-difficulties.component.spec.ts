import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesAndDifficultiesComponent } from './challenges-and-difficulties.component';

describe('ChallengesAndDifficultiesComponent', () => {
  let component: ChallengesAndDifficultiesComponent;
  let fixture: ComponentFixture<ChallengesAndDifficultiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengesAndDifficultiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesAndDifficultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
