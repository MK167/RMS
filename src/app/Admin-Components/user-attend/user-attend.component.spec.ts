import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttendComponent } from './user-attend.component';

describe('UserAttendComponent', () => {
  let component: UserAttendComponent;
  let fixture: ComponentFixture<UserAttendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAttendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAttendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
