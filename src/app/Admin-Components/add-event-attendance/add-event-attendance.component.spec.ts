import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventAttendanceComponent } from './add-event-attendance.component';

describe('AddEventAttendanceComponent', () => {
  let component: AddEventAttendanceComponent;
  let fixture: ComponentFixture<AddEventAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
