import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceEditorComponent } from './ice-editor.component';

describe('IceEditorComponent', () => {
  let component: IceEditorComponent;
  let fixture: ComponentFixture<IceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
