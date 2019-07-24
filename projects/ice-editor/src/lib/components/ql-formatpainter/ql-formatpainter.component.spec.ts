import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlFormatpainterComponent } from './ql-formatpainter.component';

describe('QlFormatpainterComponent', () => {
  let component: QlFormatpainterComponent;
  let fixture: ComponentFixture<QlFormatpainterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlFormatpainterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlFormatpainterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
