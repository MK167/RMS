import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram8Component } from './add-academics-program8.component';

describe('AddAcademicsProgram8Component', () => {
  let component: AddAcademicsProgram8Component;
  let fixture: ComponentFixture<AddAcademicsProgram8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
