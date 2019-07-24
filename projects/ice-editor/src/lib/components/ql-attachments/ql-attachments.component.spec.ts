import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlAttachmentsComponent } from './ql-attachments.component';

describe('QlAttachmentsComponent', () => {
  let component: QlAttachmentsComponent;
  let fixture: ComponentFixture<QlAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
