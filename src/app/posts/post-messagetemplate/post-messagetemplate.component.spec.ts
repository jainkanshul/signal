import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMessagetemplateComponent } from './post-messagetemplate.component';

describe('PostMessagetemplateComponent', () => {
  let component: PostMessagetemplateComponent;
  let fixture: ComponentFixture<PostMessagetemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMessagetemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMessagetemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
