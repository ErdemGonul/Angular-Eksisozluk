import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserentriesComponent } from './userentries.component';

describe('UserentriesComponent', () => {
  let component: UserentriesComponent;
  let fixture: ComponentFixture<UserentriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserentriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserentriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
