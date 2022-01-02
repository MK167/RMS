import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram6Component } from './add-academics-program6.component';

describe('AddAcademicsProgram6Component', () => {
  let component: AddAcademicsProgram6Component;
  let fixture: ComponentFixture<AddAcademicsProgram6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
