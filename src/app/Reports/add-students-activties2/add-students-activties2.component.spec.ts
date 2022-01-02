import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentsActivties2Component } from './add-students-activties2.component';

describe('AddStudentsActivties2Component', () => {
  let component: AddStudentsActivties2Component;
  let fixture: ComponentFixture<AddStudentsActivties2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentsActivties2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentsActivties2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
