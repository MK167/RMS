import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicsCooperationComponent } from './add-academics-cooperation.component';

describe('AddAcademicsCooperationComponent', () => {
  let component: AddAcademicsCooperationComponent;
  let fixture: ComponentFixture<AddAcademicsCooperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAcademicsCooperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicsCooperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
