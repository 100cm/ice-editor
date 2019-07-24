import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlLinkComponent } from './ql-link.component';

describe('QlLinkComponent', () => {
  let component: QlLinkComponent;
  let fixture: ComponentFixture<QlLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
