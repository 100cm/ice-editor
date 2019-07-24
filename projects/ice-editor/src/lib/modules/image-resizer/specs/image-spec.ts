import {BlotSpec} from './blot-spect';
import {ImageResizer} from '../image-resizer';

export class ImageSpec extends BlotSpec {
  img: HTMLElement;

  constructor(formatter: ImageResizer) {
    super(formatter);
    this.img = null;
  }

  init() {
    this.formatter.quill.root.addEventListener('click', this.onClick);
  }

  getTargetElement(): HTMLElement {
    return this.img;
  }

  onHide() {
    this.img = null;
  }

  onClick = (event: MouseEvent) => {
    const el = event.target;
    if (!(el instanceof HTMLElement) || el.tagName !== 'IMG') {
      return;
    }

    this.img = el;
    this.formatter.show(this);
  };
}
