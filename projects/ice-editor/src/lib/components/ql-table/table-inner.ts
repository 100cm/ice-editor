import ContainBlot from './ContainBlot';
import Parchment from 'parchment';
import Table from './TableBlot';
import {createClassElement, eleWidth} from '../core/element-helper';
import Quill from 'quill/core';

export class TableInner extends ContainBlot {
  static blotName = 'sheet';
  static className = 'ql-sheet-container-inner';
  static tagName = 'DIV';
  static scope = Parchment.Scope.BLOCK_BLOT;
  static defaultChild = 'table';
  // static allowedChildren = [Table];

  menu;
  innerNode;
  table;
  colCount;
  rowCount;
  rowHeader;
  colHeader;
  header;
  corner;
  dragLayer;
  vline;
  resizing = false;
  scroll;
  trashButton;

  constructor(node) {
    super(node);
    this.buildMenu();
    this.buildDragLayer();
    this.buildVline();
    document.addEventListener('click', () => {
      this.hideMenu();
    });
    this.domNode.appendChild(this.menu);
    this.domNode.appendChild(this.dragLayer);
    this.domNode.appendChild(this.vline);
  }

  static create(value) {
    const tagName = 'sheet';
    const node = super.create(tagName);
    node.setAttribute('table_id', value);
    return node;
  }

  private get quill() {
    if (!this.scroll || !this.scroll.domNode.parentNode) {
      return null;
    }

    return Quill.find(this.scroll.domNode.parentNode!);
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

  buildMenu() {
    this.menu = document.createElement('ul');
    this.menu.className = 'ql-sheet-menu';
    this.menu.innerHTML = `<li class="cut ql-sheet-menuitem-disabled" cmd="cut">剪切</li><li class="copy ql-sheet-menuitem-disabled" cmd="copy">复制</li><li class="paste" cmd="paste">粘贴<div class="ql-sheet-tip">请使用 ⌘+V 粘贴</div></li><li class="group-1 ql-sheet-menuitem-divide" cmd="group1"></li><li class="insert-above" cmd="insertAbove">向上插入 1 行</li><li class="insert-below" cmd="insertBelow">向下插入 1 行</li><li class="insert-left" cmd="insertLeft">向左插入 1 列</li><li class="insert-right" cmd="insertRight">向右插入 1 列</li><li class="group-1-5 ql-sheet-menuitem-divide" cmd="group1.5"></li><li class="insert-link" cmd="insertLink">插入超链接</li><li class="group-2 ql-sheet-menuitem-divide ql-sheet-menuitem-hidden" cmd="group2"></li><li class="merge ql-sheet-menuitem-hidden" cmd="merge">合并单元格</li><li class="un-merge ql-sheet-menuitem-hidden" cmd="unMerge">取消合并单元格</li><li class="group-3 ql-sheet-menuitem-divide" cmd="group3"></li><li class="remove-col" cmd="removeCol">删除列</li><li class="remove-row" cmd="removeRow">删除行</li><li class="remove-table ql-sheet-menuitem-danger" cmd="removeTable">删除表格</li>`;
  }

  hideMenu() {
    this.menu.style = '';
  }

  showMenu(e, table) {
    const rect = table.getBoundingClientRect();
    this.menu.style.left = (e.x - rect.left) + 'px';
    this.menu.style.top = e.y - rect.y + 'px';
    this.menu.style.display = 'block';
  }

  buildHeader() {
    this.header = createClassElement('div', ['ql-sheet-header-wrapper']);
    this.buildCorner();
    this.buildColHeader();
    this.buildRowHeader();
    this.buildHeaderButton();
    this.domNode.appendChild(this.header);
  }

  get trs() {
    return Array.from(this.domNode.querySelectorAll('tr'));
  }

  get tds() {
    return Array.from(this.domNode.querySelectorAll('td'));
  }

  get cols(): any[] {
    return Array.from(this.domNode.querySelectorAll('col'));
  }

  get col_headers(): any[] {
    return Array.from(this.domNode.querySelectorAll('.ql-sheet-col-header'));
  }

  buildColHeader() {
    this.colHeader = document.createElement('div');
    this.colHeader.classList.add('ql-sheet-col-headers');
    const wrapper = createClassElement('div', ['ql-sheet-col-wrapper']);
    const inner = createClassElement('div', ['ql-sheet-col-headers-inner']);
    for (let i = 1; i <= this.colCount; i++) {
      const border = createClassElement('div', ['ql-sheet-border', 'ql-sheet-col-header', 'ql-sheet-highlight']);
      border.setAttribute('col', i);
      border.style.width = '120px';
      inner.appendChild(border);
    }
    inner.addEventListener('click', (e) => {
      const node = e.target;
      const col = node.getAttribute('col');
      this.domNode.classList.add('ql-sheet-selected');
      this.trashButton.setAttribute('type', 'col');
      Array.from(this.domNode.querySelectorAll('tr')).forEach((tr: any, index) => {
        Array.from(tr.querySelectorAll('td')).forEach((el: any, index) => {
          if (index + 1 === parseInt(col)) {
            el.classList.add('selected');
          } else {
            el.classList.remove('selected');
          }
        });
      });

    });

    wrapper.appendChild(inner);
    this.colHeader.appendChild(wrapper);
    this.header.appendChild(this.colHeader);
  }

  buildRowHeader() {
    this.rowHeader = document.createElement('div');
    this.rowHeader.classList.add('ql-sheet-row-headers');
    const wrapper = createClassElement('div', ['ql-sheet-row-wrapper']);
    const inner = createClassElement('div', ['ql-sheet-row-headers-inner']);
    for (let i = 1; i <= this.rowCount; i++) {
      const border = createClassElement('div', ['ql-sheet-border', 'ql-sheet-row-header', 'ql-sheet-highlight']);
      border.innerHTML = `<div class="ql-sheet-header-cell"></div>`;
      border.setAttribute('row', i);
      border.style.height = '80px';
      inner.appendChild(border);
    }
    inner.addEventListener('click', (e) => {
      const node = e.target.parentElement;
      const row = node.getAttribute('row');
      this.domNode.classList.add('ql-sheet-selected');
      this.trashButton.setAttribute('type', 'row');
      Array.from(this.domNode.querySelectorAll('tr')).forEach((tr: any, index) => {
        if (index + 1 === parseInt(row)) {
          Array.from(tr.querySelectorAll('td')).forEach((el: any) => {
            el.classList.add('selected');
          });
        } else {
          Array.from(tr.querySelectorAll('td')).forEach((el: any) => {
            el.classList.remove('selected');
          });

        }
      });

    });
    wrapper.appendChild(inner);
    this.rowHeader.appendChild(wrapper);
    this.header.appendChild(this.rowHeader);
  }

  buildCorner() {
    this.corner = createClassElement('div', ['ql-sheet-border', 'ql-sheet-corner']);
    this.corner.addEventListener('click', (e) => {
      this.corner.classList.add('selected');
      this.domNode.classList.add('ql-sheet-selected');
      let index = Parchment.find(this.table).offset(this.quill.scroll);
      // this.quill.setSelection(index, this.tds.length * 2, Quill.sources.user);
    });
    this.header.appendChild(this.corner);
  }

  buildVline() {
    this.vline = createClassElement('div', ['ql-sheet-resize-vline']);
    this.vline.style.display = 'none';
    this.vline.innerHTML = `<div class="ql-sheet-top-rect"></div><div class="ql-sheet-line"></div>`;
  }

  buildHeaderButton() {
    const headerButton = createClassElement('div', ['ql-sheet-header-button']);
    this.trashButton = createClassElement('div', ['ql-sheet-trash']);
    const rowButton = createClassElement('div', ['ql-sheet-button-plus', 'ql-sheet-row-plus']);
    const colButton = createClassElement('div', ['ql-sheet-button-plus', 'ql-sheet-col-plus']);
    headerButton.appendChild(this.trashButton);
    this.header.appendChild(headerButton);
  }

  buildDragLayer() {
    this.dragLayer = createClassElement('div', ['ql-sheet-drag-layer']);
    const buttons = ['top', 'right', 'left', 'bottom'];
    buttons.forEach((className) => {
      const button = createClassElement('div', [`ql-sheet-drag-${className}`]);
      this.dragLayer.appendChild(button);

      button.addEventListener('mousedown', (e) => {
        const className = e.target.className;
        const direction = className.split('ql-sheet-drag-')[1];
        const cursorRect = e.target.parentElement;
        const left = parseInt(e.target.parentElement.style.left);
        const width = parseInt(e.target.parentElement.style.width);
        let col = this.dragLayer.getAttribute('col');
        let row = this.dragLayer.getAttribute('row');
        let isFirst = false;
        switch (direction) {
          case 'left':
            col = col - 1;
            this.vline.style.left = left + 'px';
            break;
          case 'right':
            this.vline.style.left = left + width + 'px';
            break;
        }
        const baseOffset = parseInt(this.vline.style.left);
        let base_col_width;
        if (!this.cols[col] && direction === 'left') {
          base_col_width = parseInt(this.cols[col + 1].getAttribute('width'));
          isFirst = true;
          col = col + 1;
          return;
        } else {
          base_col_width = parseInt(this.cols[col].getAttribute('width'));
        }

        this.resizing = true;
        this.vline.style.display = 'block';
        let final_width;
        const mousemove = (e: any) => {
          e.preventDefault();
          this.moveVline(e);
          const lastOffset = parseInt(this.vline.style.left);
          const offset = lastOffset - baseOffset;

          const col_width = isFirst ? base_col_width - offset : base_col_width + offset;
          // this.cols[col].style.width = col_width + 'px';
          final_width = col_width;
          // this.cols[col].setAttribute('width', final_width);
          this.col_headers[col].style.width = col_width + 'px';
          let blot: any = Parchment.find(this.cols[col]);
          blot.format('width', final_width);
          this.quill.update(Quill.sources.USER);
        };
        const mouseup = () => {
          this.resizing = false;
          this.vline.style.display = 'none';
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseup);
        };
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
      });
    });
  }

  get colGroup() {
    return this.children.head.children;
  }

  setDragLayerPosition(e, table) {
    if (this.resizing) {
      return;
    }
    this.table = table;
    const td = e.target;
    const rect = td.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();
    this.dragLayer.setAttribute('col', td.getAttribute('col'));
    this.dragLayer.setAttribute('row', td.getAttribute('row'));
    this.dragLayer.style.width = rect.width + 'px';
    this.dragLayer.style.height = rect.height + 'px';
    this.dragLayer.style.left = (rect.x - tableRect.left) + 'px';
    this.dragLayer.style.top = rect.y - tableRect.y + 'px';
  }

  moveVline(rect) {
    const tableRect = this.table.getBoundingClientRect();
    this.vline.style.left = (rect.x - tableRect.left) + 'px';
  }


}
