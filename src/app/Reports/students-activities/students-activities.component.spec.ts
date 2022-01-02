import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsActivitiesComponent } from './students-activities.component';

describe('StudentsActivitiesComponent', () => {
  let component: StudentsActivitiesComponent;
  let fixture: ComponentFixture<StudentsActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
