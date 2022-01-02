import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram7Component } from './add-academics-program7.component';

describe('AddAcademicsProgram7Component', () => {
  let component: AddAcademicsProgram7Component;
  let fixture: ComponentFixture<AddAcademicsProgram7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
