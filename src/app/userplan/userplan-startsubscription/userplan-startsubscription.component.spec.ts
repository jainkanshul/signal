import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserplanStartsubscriptionComponent } from './userplan-startsubscription.component';

describe('UserplanStartsubscriptionComponent', () => {
  let component: UserplanStartsubscriptionComponent;
  let fixture: ComponentFixture<UserplanStartsubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserplanStartsubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserplanStartsubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
