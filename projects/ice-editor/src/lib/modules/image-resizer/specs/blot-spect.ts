
import {ImageResizer} from '../image-resizer';
import {Action} from '../actions/action';
import {AlignAction} from '../actions/align-action';
import {ResizeAction} from '../actions/resize-action';
import DeleteAction from '../actions/delete-action';

export class BlotSpec {
  formatter: ImageResizer;

  constructor(formatter: ImageResizer) {
    this.formatter = formatter;
  }

  init(): void {
  }

  getActions(): any[] {
    return [AlignAction, ResizeAction, DeleteAction];
  }

  getTargetElement(): HTMLElement {
    return null;
  }

  getOverlayElement(): HTMLElement {
    return this.getTargetElement();
  }

  setSelection(): void {
    this.formatter.quill.setSelection(null);
  }

  onHide() {
  }
}
