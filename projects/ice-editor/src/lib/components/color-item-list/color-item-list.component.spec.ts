import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorItemListComponent } from './color-item-list.component';

describe('ColorItemListComponent', () => {
  let component: ColorItemListComponent;
  let fixture: ComponentFixture<ColorItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
