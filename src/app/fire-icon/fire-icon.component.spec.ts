import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireIconComponent } from './fire-icon.component';

describe('FireIconComponent', () => {
  let component: FireIconComponent;
  let fixture: ComponentFixture<FireIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
