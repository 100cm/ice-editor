import {Component, OnInit} from '@angular/core';
import {IceEditorComponent} from '../../ice-editor.component';

@Component({
  selector: 'ql-insert',
  templateUrl: './ql-insert.component.html',
  styleUrls: ['./ql-insert.component.css']
})
export class QlInsertComponent implements OnInit {

  show = false;

  rows = Array.from({length: 7}, (v, k) => k + 1);
  cols = Array.from({length: 8}, (v, k) => k + 1);


  constructor(private editor: IceEditorComponent) {
  }

  ngOnInit() {
  }

  setShow() {
    this.show = !this.show;
  }


  addTable() {
    const selection = this.editor.quill.getSelection(true);
    this.editor.quill.insertEmbed(selection.index, 'table', {width: 10, height: 20});
  }


}
