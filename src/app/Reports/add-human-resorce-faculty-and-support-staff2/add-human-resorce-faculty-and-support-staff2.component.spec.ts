import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHumanResorceFacultyAndSupportStaff2Component } from './add-human-resorce-faculty-and-support-staff2.component';

describe('AddHumanResorceFacultyAndSupportStaff2Component', () => {
  let component: AddHumanResorceFacultyAndSupportStaff2Component;
  let fixture: ComponentFixture<AddHumanResorceFacultyAndSupportStaff2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHumanResorceFacultyAndSupportStaff2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHumanResorceFacultyAndSupportStaff2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
