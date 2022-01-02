import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram12Component } from './add-academics-program12.component';

describe('AddAcademicsProgram12Component', () => {
  let component: AddAcademicsProgram12Component;
  let fixture: ComponentFixture<AddAcademicsProgram12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
