import { TestBed } from '@angular/core/testing';

import { IceEditorService } from './ice-editor.service';

describe('IceEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IceEditorService = TestBed.get(IceEditorService);
    expect(service).toBeTruthy();
  });
});
