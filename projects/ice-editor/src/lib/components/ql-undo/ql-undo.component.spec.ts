import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlUndoComponent } from './ql-undo.component';

describe('QlUndoComponent', () => {
  let component: QlUndoComponent;
  let fixture: ComponentFixture<QlUndoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlUndoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlUndoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
