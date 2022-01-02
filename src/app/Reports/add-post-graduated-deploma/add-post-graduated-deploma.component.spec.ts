import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostGraduatedDeplomaComponent } from './add-post-graduated-deploma.component';

describe('AddPostGraduatedDeplomaComponent', () => {
  let component: AddPostGraduatedDeplomaComponent;
  let fixture: ComponentFixture<AddPostGraduatedDeplomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostGraduatedDeplomaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostGraduatedDeplomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
