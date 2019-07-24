import {IceQuill} from '../quill';
import Parchment from 'parchment';

import Cursor from 'quill/blots/cursor';

export class IceFontEmbed extends Cursor {
  static blotName = 'ice-font';
  static className = 'ql-cursor';
  static tagName = 'span';
  static CONTENTS = '\uFEFF';   // Zero width no break space

  textNode;
  domNode;
  _length;

  constructor(domNode, value) {
    super(domNode);
    this.textNode = document.createTextNode(Cursor.CONTENTS);
    this.domNode.appendChild(this.textNode);
    this.domNode.style.color = '#' + value.color;
    this._length = 0;
  }

}
