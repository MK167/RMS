import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram9Component } from './add-academics-program9.component';

describe('AddAcademicsProgram9Component', () => {
  let component: AddAcademicsProgram9Component;
  let fixture: ComponentFixture<AddAcademicsProgram9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
