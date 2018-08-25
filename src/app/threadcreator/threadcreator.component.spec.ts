import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadcreatorComponent } from './threadcreator.component';

describe('ThreadcreatorComponent', () => {
  let component: ThreadcreatorComponent;
  let fixture: ComponentFixture<ThreadcreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadcreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
