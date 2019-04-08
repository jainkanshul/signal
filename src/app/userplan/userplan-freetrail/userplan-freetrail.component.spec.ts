import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserplanFreetrailComponent } from './userplan-freetrail.component';

describe('UserplanFreetrailComponent', () => {
  let component: UserplanFreetrailComponent;
  let fixture: ComponentFixture<UserplanFreetrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserplanFreetrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserplanFreetrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
