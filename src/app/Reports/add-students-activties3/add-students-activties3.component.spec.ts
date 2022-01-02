import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsActivties3Component } from './add-students-activties3.component';

describe('AddStudentsActivties3Component', () => {
  let component: AddStudentsActivties3Component;
  let fixture: ComponentFixture<AddStudentsActivties3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentsActivties3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsActivties3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
