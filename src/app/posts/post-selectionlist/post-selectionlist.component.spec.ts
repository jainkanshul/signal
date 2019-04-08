import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSelectionlistComponent } from './post-selectionlist.component';

describe('PostSelectionlistComponent', () => {
  let component: PostSelectionlistComponent;
  let fixture: ComponentFixture<PostSelectionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSelectionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSelectionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
