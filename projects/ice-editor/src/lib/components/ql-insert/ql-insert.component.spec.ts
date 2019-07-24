import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QlInsertComponent } from './ql-insert.component';

describe('QlInsertComponent', () => {
  let component: QlInsertComponent;
  let fixture: ComponentFixture<QlInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
