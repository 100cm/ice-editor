import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlRedoComponent } from './ql-redo.component';

describe('QlRedoComponent', () => {
  let component: QlRedoComponent;
  let fixture: ComponentFixture<QlRedoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlRedoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlRedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
