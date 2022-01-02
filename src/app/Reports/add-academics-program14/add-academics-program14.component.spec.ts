import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram14Component } from './add-academics-program14.component';

describe('AddAcademicsProgram14Component', () => {
  let component: AddAcademicsProgram14Component;
  let fixture: ComponentFixture<AddAcademicsProgram14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram14Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
