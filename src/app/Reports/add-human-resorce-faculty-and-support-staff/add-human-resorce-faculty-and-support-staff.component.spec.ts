import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHumanResorceFacultyAndSupportStaffComponent } from './add-human-resorce-faculty-and-support-staff.component';

describe('AddHumanResorceFacultyAndSupportStaffComponent', () => {
  let component: AddHumanResorceFacultyAndSupportStaffComponent;
  let fixture: ComponentFixture<AddHumanResorceFacultyAndSupportStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHumanResorceFacultyAndSupportStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHumanResorceFacultyAndSupportStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
