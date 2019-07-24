import ContainBlot from './ContainBlot';
import TableCell from './TableCellBlot';
import TableRow from './TableRowBlot';
import Parchment from 'parchment';
import TableTrick from './TableTrick';


export class TbodyBlot extends ContainBlot {
  static blotName = 'tbody';
  static tagName = 'tbody';
  // static scope = Parchment.Scope.BLOCK_BLOT;
  static className = 'ql-sheet-body';

  static create(options) {
    let tagName = 'tbody';
    let node = super.create(tagName);
    node.setAttribute('tbody_id', options);
    return node;
  }

  format() {
    this.getAttribute('tbody_id');
  }


  optimize(context) {
    super.optimize(context);
    const next = this.next;
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName &&
      next.domNode.getAttribute('tbody_id') === this.domNode.getAttribute('tbody_id')) {
      next.moveChildren(this);
      next.remove();
    }
  }

  insertBefore(childBlot, refBlot) {
    if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some((child) => {
      return childBlot instanceof child;
    })) {
      const newChild: any = Parchment.create(this.statics.defaultChild, TableTrick.random_id());
      newChild.appendChild(childBlot);
      childBlot = newChild;
    }
    super.insertBefore(childBlot, refBlot);
  }

}
