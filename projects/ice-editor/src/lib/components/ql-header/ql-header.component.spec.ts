import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlHeaderComponent } from './ql-header.component';

describe('QlHeaderComponent', () => {
  let component: QlHeaderComponent;
  let fixture: ComponentFixture<QlHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
