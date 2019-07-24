import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlAlignComponent } from './ql-align.component';

describe('QlAlignComponent', () => {
  let component: QlAlignComponent;
  let fixture: ComponentFixture<QlAlignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlAlignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlAlignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
