import {IceQuill as Quill} from '../quill';
import ContainBlot from './ContainBlot';

let Container = Quill.import('blots/container');
let Block = Quill.import('blots/block');
let BlockEmbed = Quill.import('blots/block/embed');
let Parchment = Quill.import('parchment');

class TableCell extends ContainBlot {

  static blotName = 'td';
  static tagName = 'td';
  // static scope = Parchment.Scope.BLOCK_BLOT;
  //

  domNode;
  statics;
  parent;
  sheet;
  table;

  constructor(node) {
    super(node);
  }

  static create(options) {
    let tagName = 'td';
    let node = super.create(tagName);
    let ids = options.klass.split('|');
    node.setAttribute('table_id', ids[0]);
    node.setAttribute('tbody_id', ids[1]);
    node.setAttribute('row_id', ids[2]);
    node.setAttribute('cell_id', ids[3]);
    node.setAttribute('col_count', ids[4]);
    node.setAttribute('row_count', ids[5]);
    node.setAttribute('col', options.col);
    node.setAttribute('row', options.row);
    node.classList.add('ql-sheet-cell');
    node.setAttribute('contenteditable', true);
    return node;
  }

  format() {
    this.getAttribute('id');
  }

  formats() {
    // We don't inherit from FormatBlot
    return {
      [this.statics.blotName]:
        {
          klass: this.domNode.getAttribute('table_id') + '|' +
            this.domNode.getAttribute('tbody_id') + '|' +
            this.domNode.getAttribute('row_id') + '|' +
            this.domNode.getAttribute('cell_id'), row: this.domNode.getAttribute('row'), col: this.domNode.getAttribute('col'
          )
        }
    };
  }

  optimize(context) {
    super.optimize(context);
    let parent = this.parent;
    if (parent != null) {
      if (parent.statics.blotName === 'td') {
        this.moveChildren(parent, this);
        this.remove();
        return;
      } else if (parent.statics.blotName !== 'tr') {
        // we will mark td position, put in table and replace mark
        const table_id = this.domNode.getAttribute('table_id');
        const mark = Parchment.create('sheet', table_id);
        const table_container = Parchment.create('table-container', table_id);
        const col_count = parseInt(this.domNode.getAttribute('col_count'));
        const row_count = parseInt(this.domNode.getAttribute('row_count'));
        mark.colCount = col_count;
        mark.rowCount = row_count;
        mark.buildHeader();
        this.parent.insertBefore(table_container, this.next, this.domNode.getAttribute('table_id'));
        let tbody = Parchment.create('tbody', this.domNode.getAttribute('tbody_id'));
        let table = Parchment.create('table', {col_count, table_id});
        let tr = Parchment.create('tr', this.domNode.getAttribute('row_id'));
        tbody.appendChild(tr);
        tr.appendChild(this);
        table.appendChild(tbody);
        mark.appendChild(table);
        this.sheet = mark;
        this.table = table;
        table.sheet = mark;
        table_container.appendChild(mark);
      }
    }
    //
    // // merge same TD id
    let next = this.next;
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName &&
      next.domNode.getAttribute('cell_id') === this.domNode.getAttribute('cell_id')) {
      next.moveChildren(this);
      next.remove();
    }
  }

  insertBefore(childBlot, refBlot) {
    if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(child) {
      return childBlot instanceof child;
    })) {
      let newChild = Parchment.create(this.statics.defaultChild);
      newChild.appendChild(childBlot);
      childBlot = newChild;
    }
    super.insertBefore(childBlot, refBlot);
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    if (target.parent == null) {
      return;
    }
    super.replace(target);
  }

  moveChildren(targetParent, refNode) {
    this.children.forEach((child) => {
      targetParent.insertBefore(child, refNode);
    });
  }
}


export default TableCell;
