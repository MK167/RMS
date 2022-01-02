import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserImagesComponent } from './add-user-images.component';

describe('AddUserImagesComponent', () => {
  let component: AddUserImagesComponent;
  let fixture: ComponentFixture<AddUserImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
