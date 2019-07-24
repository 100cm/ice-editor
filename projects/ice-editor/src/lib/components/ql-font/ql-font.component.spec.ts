import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlFontComponent } from './ql-font.component';

describe('QlFontComponent', () => {
  let component: QlFontComponent;
  let fixture: ComponentFixture<QlFontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlFontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
