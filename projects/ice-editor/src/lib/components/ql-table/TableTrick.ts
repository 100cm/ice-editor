/* tslint:disable:radix variable-name */
import {IceQuill as Quill} from '../quill';

const Parchment = Quill.import('parchment');
const Container = Quill.import('blots/container');
const Scroll = Quill.import('blots/scroll');

export default class TableTrick {
  static random_id() {
    return Math.random().toString(36).slice(2);
  }

  static find_td(quill) {
    const leaf = quill.getLeaf(quill.getSelection()['index']);
    let blot = leaf[0];
    for (; blot != null && blot.statics.blotName !== 'td';) {
      blot = blot.parent;
    }
    return blot; // return TD or NULL
  }

  static table_handler(value, quill) {
    if (value.includes('newtable_')) {
      let node = null;
      const sizes = value.split('_');
      const row_count = Number.parseInt(sizes[1]);
      const col_count = Number.parseInt(sizes[2]);
      const table_id = TableTrick.random_id();
      const sheet = Parchment.create('sheet', table_id);
      const table = Parchment.create('table', {col_count, table_id});
      const container = Parchment.create('table-container', table_id);
      const tbody = Parchment.create('tbody');
      sheet.colCount = col_count;
      sheet.rowCount = row_count;
      sheet.table = table;
      sheet.buildHeader();
      table.sheet = sheet;
      const col_group = Parchment.create('col-group', {col_count, table_id});
      for (let i = 0; i < col_count; i++) {
        const col: any = Parchment.create('col', {width: '120px'});
        col_group.appendChild(col);
      }
      for (let ri = 0; ri < row_count; ri++) {
        const row_id = TableTrick.random_id();
        const tr = Parchment.create('tr', row_id);
        tbody.appendChild(tr);
        for (let ci = 0; ci < col_count; ci++) {
          const cell_id = TableTrick.random_id();
          value = table_id + '|' + table_id + '|' + row_id + '|' + cell_id;
          const options = {klass: value, col: ci, row: ri};
          const td = Parchment.create('td', options);
          td.sheet = sheet;
          td.table = table;
          td.domNode.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            sheet.showMenu(e, table.domNode);
          });
          td.domNode.addEventListener('mouseenter', (e) => {
            sheet.setDragLayerPosition(e, table.domNode);
          });
          tr.appendChild(td);
          const p = Parchment.create('block');
          td.appendChild(p);
          const br = Parchment.create('break');
          p.appendChild(br);
          node = p;
        }
      }
      // table.appendChild(col_group);
      table.appendChild(tbody);
      const leaf = quill.getLeaf(quill.getSelection()['index']);
      let blot = leaf[0];
      let top_branch = null;
      for (; blot != null && !(blot instanceof Container || blot instanceof Scroll);) {
        top_branch = blot;
        blot = blot.parent;
      }
      sheet.appendChild(table);
      container.appendChild(sheet);
      blot.insertBefore(container, top_branch);
      return node;
    } else if (value === 'append-col') {
      const td = TableTrick.find_td(quill);
      if (td) {
        const table = td.parent.parent;
        const table_id = table.domNode.getAttribute('table_id');
        table.children.forEach(function(tr, index) {
          const row_id = tr.domNode.getAttribute('row_id');
          const cell_id = TableTrick.random_id();
          const td = Parchment.create('td', table_id + '|' + row_id + '|' + cell_id);
          tr.appendChild(td);
        });
      }
    } else if (value === 'append-row') {
      const td = TableTrick.find_td(quill);
      if (td) {
        const col_count = td.parent.children.length;
        const table = td.parent.parent;
        const new_row = td.parent.clone();
        const table_id = table.domNode.getAttribute('table_id');
        const row_id = TableTrick.random_id();
        new_row.domNode.setAttribute('row_id', row_id);
        for (let i = col_count - 1; i >= 0; i--) {
          const cell_id = TableTrick.random_id();
          const td = Parchment.create('td', table_id + '|' + row_id + '|' + cell_id);
          new_row.appendChild(td);
          const p = Parchment.create('block');
          td.appendChild(p);
          const br = Parchment.create('break');
          p.appendChild(br);
        }
        table.appendChild(new_row);
        console.log(new_row);
      }
    } else {
      const table_id = TableTrick.random_id();
      const table = Parchment.create('table', table_id);

      const leaf = quill.getLeaf(quill.getSelection()['index']);
      let blot = leaf[0];
      let top_branch = null;
      for (; blot != null && !(blot instanceof Container || blot instanceof Scroll);) {
        top_branch = blot;
        blot = blot.parent;
      }
      blot.insertBefore(table, top_branch);
      return table;
    }
  }
}
