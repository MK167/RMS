import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsProgram5Component } from './add-academics-program5.component';

describe('AddAcademicsProgram5Component', () => {
  let component: AddAcademicsProgram5Component;
  let fixture: ComponentFixture<AddAcademicsProgram5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsProgram5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsProgram5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
