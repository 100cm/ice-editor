import {TableInner} from './table-inner';
import ContainBlot from './ContainBlot';
import Parchment from 'parchment';

export class TableContainer extends ContainBlot {
  static blotName = 'table-container';
  static className = 'ql-sheet-container';
  static tagName = 'DIV';
  static scope = Parchment.Scope.BLOCK_BLOT;
  // static defaultChild = 'sheet';
  // static allowedChildren = [TableInner];

  static create(value) {
    const node = super.create(value);
    node.addEventListener('click', (e) => {
      node.classList.add('ql-sheet-focus');
    });
    node.setAttribute('table_id', value);
    node.setAttribute('contenteditable', false);
    return node;
  }

  optimize(context) {
    super.optimize(context);
    const next = this.next;
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName &&
      next.domNode.getAttribute('table_id') === this.domNode.getAttribute('table_id')) {
      next.moveChildren(this);
      next.remove();
    }
  }
}
