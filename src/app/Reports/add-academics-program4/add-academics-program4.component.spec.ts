import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram4Component } from './add-academics-program4.component';

describe('AddAcademicsProgram4Component', () => {
  let component: AddAcademicsProgram4Component;
  let fixture: ComponentFixture<AddAcademicsProgram4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
