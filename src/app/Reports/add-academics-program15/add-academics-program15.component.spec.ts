import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram15Component } from './add-academics-program15.component';

describe('AddAcademicsProgram15Component', () => {
  let component: AddAcademicsProgram15Component;
  let fixture: ComponentFixture<AddAcademicsProgram15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram15Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
