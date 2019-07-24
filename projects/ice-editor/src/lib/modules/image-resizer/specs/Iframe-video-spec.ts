import {UnclickableBlotSpec} from './unclickable-blot-spec';
import {ImageResizer} from '../image-resizer';
import {BlotSpec} from './blot-spect';

export default class IframeVideoSpec extends BlotSpec {
  img = null;

  constructor(formatter: ImageResizer) {
    super(formatter);
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
    if (!(el instanceof HTMLElement) || el.tagName !== 'IFRAME') {
      return;
    }
    this.img = el;
    this.formatter.show(this);
  };
}
