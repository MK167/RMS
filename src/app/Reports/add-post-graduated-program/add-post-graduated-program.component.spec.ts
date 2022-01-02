import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostGraduatedProgramComponent } from './add-post-graduated-program.component';

describe('AddPostGraduatedProgramComponent', () => {
  let component: AddPostGraduatedProgramComponent;
  let fixture: ComponentFixture<AddPostGraduatedProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostGraduatedProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostGraduatedProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
