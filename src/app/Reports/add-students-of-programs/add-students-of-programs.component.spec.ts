import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsOfProgramsComponent } from './add-students-of-programs.component';

describe('AddStudentsOfProgramsComponent', () => {
  let component: AddStudentsOfProgramsComponent;
  let fixture: ComponentFixture<AddStudentsOfProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentsOfProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsOfProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
