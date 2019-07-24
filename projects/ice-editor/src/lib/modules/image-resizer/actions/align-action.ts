import {Action} from './action';
import {ImageResizer} from '../image-resizer';
import {DefaultAligner} from './default-aligner';
import {Aligner} from './aligner';
import {Toolbar} from './toolbar';
import DefaultToolbar from './default-toolbar';

export class AlignAction extends Action {
  toolbar: Toolbar;
  aligner: Aligner;

  constructor(formatter: ImageResizer) {
    super(formatter);
    this.aligner = new DefaultAligner(formatter.options.align);
    this.toolbar = new DefaultToolbar();
  }

  onCreate() {
    const toolbar = this.toolbar.create(this.formatter, this.aligner);
    this.formatter.overlay.appendChild(toolbar);
  }

  onDestroy() {
    const toolbar = this.toolbar.getElement();
    if (!toolbar) {
      return;
    }

    this.formatter.overlay.removeChild(toolbar);
    this.toolbar.destroy();
  }
}
