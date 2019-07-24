import TableTrick from './TableTrick';
import ContainBlot from './ContainBlot';
import {TbodyBlot} from './tbody-blot';
import Parchment from 'parchment';
import {TableColGroup} from './table-col-group';

class Table extends ContainBlot {


  static blotName = 'table';
  static tagName = 'table';
  static scope = Parchment.Scope.BLOCK_BLOT;
  static allowedChildren = [TableColGroup, TbodyBlot];

  next;
  domNode;
  statics;
  col_group;
  sheet;

  constructor(node) {
    super(node);
    const col_count = parseInt(this.domNode.getAttribute('col_count'));
    const row_count = parseInt(this.domNode.getAttribute('row_count'));
    const table_id = this.domNode.getAttribute('table_id');
    const col_group: any = Parchment.create('col-group', {col_count, table_id});
    for (let i = 0; i < col_count; i++) {
      const col: any = Parchment.create('col', {width: '120px'});
      col_group.appendChild(col);
    }

    for (let i = 0; i < row_count; i++) {
      const row = Parchment.create('col-group', {col_count, table_id});
    }
    node.setAttribute('table_id', table_id);
    this.col_group = col_group;
    this.appendChild(col_group);

    this.domNode.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.sheet.showMenu(e, this.domNode);
    });
  }

  static create(options) {
    let tagName = 'table';
    let node = super.create(tagName);
    node.setAttribute('table_id', options.table_id);
    node.setAttribute('col_count', options.col_count);
    node.setAttribute('row_count', options.row_count);
    node.classList.add('ql-sheet');
    node.addEventListener('click', (e) => {
      console.log(e.shiftKey);
    });
    return node;
  }


  format() {
    this.getAttribute('table_id');
  }


  optimize(context) {
    super.optimize(context);
    const next = this.next;
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName &&
      next.domNode.getAttribute('table_id') === this.domNode.getAttribute('table_id')) {
      next.children.tail.moveChildren(this.children.tail);
      next.remove();
      this.children.forEach(child => {
        if (child.statics.blotName === 'tbody') {
          // tbody 下面是tr
          const trs = child.children;
          trs.forEach(tr => {
            const tds = tr.children;
            tds.forEach(td => {
              td.domNode.addEventListener('mouseenter', (e) => {
                this.sheet.setDragLayerPosition(e, this.domNode);
              });
            });
          });
        }
      });
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

export default Table;
