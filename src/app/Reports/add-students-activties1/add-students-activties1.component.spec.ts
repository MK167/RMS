import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsActivties1Component } from './add-students-activties1.component';

describe('AddStudentsActivties1Component', () => {
  let component: AddStudentsActivties1Component;
  let fixture: ComponentFixture<AddStudentsActivties1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentsActivties1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsActivties1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
