import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicProgramComponent } from './academic-program.component';

describe('AcademicProgramComponent', () => {
  let component: AcademicProgramComponent;
  let fixture: ComponentFixture<AcademicProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
