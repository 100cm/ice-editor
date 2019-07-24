/* tslint:disable:variable-name */
import {IceQuill as Quill} from '../quill';
import Delta from 'quill-delta';
import TableTrick from './TableTrick';
import Module from 'quill/core/module';
import TableCell from './TableCellBlot';
import TableRow from './TableRowBlot';
import Table from './TableBlot';
import {TableInner} from './table-inner';
import ContainBlot from './ContainBlot';
import {TbodyBlot} from './tbody-blot';
import {TableContainer} from './table-container';
import {TableColGroup} from './table-col-group';
import {TableCol} from './table-col';
import Keyboard from 'quill/modules/keyboard';

const Container = Quill.import('blots/container');

Container.order = [
  'list', 'contain',   // Must be lower
  'td', 'tr', 'table', 'sheet'  // Must be higher
];

export class TableModule {
  static register() {
    Quill.register(TableCell, true);
    Quill.register(TableRow, true);
    Quill.register(Table, true);
    Quill.register(TableInner, true);
    Quill.register(ContainBlot, true);
    Quill.register(TbodyBlot, true);
    Quill.register(TableContainer, true);
    Quill.register(TableColGroup, true);
    Quill.register(TableCol, true);
    // register customized Header，overwriting quill built-in Header
    // Quill.register('formats/header', Header, true);
  }


  constructor(quill, options) {
    const toolbar = quill.getModule('toolbar');
    document.execCommand('enableObjectResizing', false, 'false');
    toolbar.addHandler('sheet', (value) => {
      return TableTrick.table_handler(value, quill);
    });
    quill.keyboard.addBinding({key: Keyboard.keys.BACKSPACE}, {collapsed: true}, (range, context) => {
      console.log(context);
      return true;
    });

    quill.keyboard.addBinding({key: Keyboard.keys.DELETE}, {}, (range, context) => {
      console.log(context);
    });

    const clipboard = quill.getModule('clipboard');
    let table_id = TableTrick.random_id();
    let row_id = TableTrick.random_id();
    let tbody_id = TableTrick.random_id();
    let col_count = 0;
    let row_count = 0;
    let row = -1;
    let col = -1;
    let col_added = false;
    clipboard.addMatcher('TABLE', (node, delta) => {
        table_id = TableTrick.random_id();
        delta.ops.map(op => {
          op.attributes.td.klass = op.attributes.td.klass += '|' + col_count;
        });
        delta.ops.map(op => {
          op.attributes.td.klass = op.attributes.td.klass += '|' + row_count;
        });
        col_count = 0;
        col_added = false;
        row_count = 0;
        return delta;
      }
    );
    clipboard.addMatcher('TR', (node, delta) => {
      row_id = TableTrick.random_id();
      row_count += 1;
      col = -1;
      row += 1;
      delta.ops.forEach(d => {
        d.attributes.td.row = row;
      });
      col_added = true;
      return delta;
    });
    clipboard.addMatcher('TBODY', (node, delta) => {
      return delta;
    });
    clipboard.addMatcher('col-group', (node, delta) => {
      tbody_id = TableTrick.random_id();
      return delta;
    });

    clipboard.addMatcher('COL', (node, delta) => {
      return delta;
    });
    clipboard.addMatcher('TD', (node, delta) => {
      col_added ? null : col_count += 1;
      const cell_id = TableTrick.random_id();
      col += 1;
      return delta.compose(new Delta().retain(delta.length(), {
        td: {klass: `${table_id}|${tbody_id}|${row_id}|${cell_id}`, col: col, row: row}
      }));

    });
  }


}
