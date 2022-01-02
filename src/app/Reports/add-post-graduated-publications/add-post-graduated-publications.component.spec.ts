import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostGraduatedPublicationsComponent } from './add-post-graduated-publications.component';

describe('AddPostGraduatedPublicationsComponent', () => {
  let component: AddPostGraduatedPublicationsComponent;
  let fixture: ComponentFixture<AddPostGraduatedPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostGraduatedPublicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostGraduatedPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
