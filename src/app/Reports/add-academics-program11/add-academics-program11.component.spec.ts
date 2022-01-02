import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram11Component } from './add-academics-program11.component';

describe('AddAcademicsProgram11Component', () => {
  let component: AddAcademicsProgram11Component;
  let fixture: ComponentFixture<AddAcademicsProgram11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
