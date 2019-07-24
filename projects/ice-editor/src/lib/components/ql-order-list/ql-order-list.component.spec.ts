import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlOrderListComponent } from './ql-order-list.component';

describe('QlOrderListComponent', () => {
  let component: QlOrderListComponent;
  let fixture: ComponentFixture<QlOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
