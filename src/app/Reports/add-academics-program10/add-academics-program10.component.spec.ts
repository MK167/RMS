import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram10Component } from './add-academics-program10.component';

describe('AddAcademicsProgram10Component', () => {
  let component: AddAcademicsProgram10Component;
  let fixture: ComponentFixture<AddAcademicsProgram10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
