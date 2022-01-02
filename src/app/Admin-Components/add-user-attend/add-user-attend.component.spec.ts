import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAttendComponent } from './add-user-attend.component';

describe('AddUserAttendComponent', () => {
  let component: AddUserAttendComponent;
  let fixture: ComponentFixture<AddUserAttendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserAttendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserAttendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
