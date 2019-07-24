import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlFontSizeComponent } from './ql-font-size.component';

describe('QlFontSizeComponent', () => {
  let component: QlFontSizeComponent;
  let fixture: ComponentFixture<QlFontSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlFontSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlFontSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
