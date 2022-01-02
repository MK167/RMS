import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostGraduatedProgram3Component } from './add-post-graduated-program3.component';

describe('AddPostGraduatedProgram3Component', () => {
  let component: AddPostGraduatedProgram3Component;
  let fixture: ComponentFixture<AddPostGraduatedProgram3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostGraduatedProgram3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostGraduatedProgram3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
