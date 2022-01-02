import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram13Component } from './add-academics-program13.component';

describe('AddAcademicsProgram13Component', () => {
  let component: AddAcademicsProgram13Component;
  let fixture: ComponentFixture<AddAcademicsProgram13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
