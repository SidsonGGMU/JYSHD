import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeIconComponent } from './real-time-icon.component';

describe('RealTimeIconComponent', () => {
  let component: RealTimeIconComponent;
  let fixture: ComponentFixture<RealTimeIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
