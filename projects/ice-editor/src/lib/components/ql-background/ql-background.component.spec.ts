import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlBackgroundComponent } from './ql-background.component';

describe('QlBackgroundComponent', () => {
  let component: QlBackgroundComponent;
  let fixture: ComponentFixture<QlBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
