import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserplanSubscribeduserlistComponent } from './userplan-subscribeduserlist.component';

describe('UserplanSubscribeduserlistComponent', () => {
  let component: UserplanSubscribeduserlistComponent;
  let fixture: ComponentFixture<UserplanSubscribeduserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserplanSubscribeduserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserplanSubscribeduserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
