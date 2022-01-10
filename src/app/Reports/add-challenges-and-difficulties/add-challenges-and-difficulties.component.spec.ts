import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChallengesAndDifficultiesComponent } from './add-challenges-and-difficulties.component';

describe('AddChallengesAndDifficultiesComponent', () => {
  let component: AddChallengesAndDifficultiesComponent;
  let fixture: ComponentFixture<AddChallengesAndDifficultiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChallengesAndDifficultiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChallengesAndDifficultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
