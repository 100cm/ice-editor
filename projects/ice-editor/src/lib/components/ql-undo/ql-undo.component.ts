import {Component, OnInit} from '@angular/core';
import {IceEditorComponent} from '../../ice-editor.component';

@Component({
  selector: 'ql-undo',
  template: `
    <button (click)="undo()" type="button" class="ql-undo">
      <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
           y="0px" viewBox="0 0 30 27" style="enable-background:new 0 0 30 27" xml:space="preserve"> <desc>Created with Sketch.</desc>
        <g
          id="Page-1"> <g id="撤销1x"> <path id="Combined-Shape" d="M12.9,15l1.6,2H7l1.7-7l1.6,1.9c0.9-0.8,2.9-1.8,6.3-1.8c5.3,0,7.4,5.4,7.4,5.4
			S20.9,12,17.5,12C14.9,12,13.4,14,12.9,15z"></path> </g> </g> </svg>
    </button>
  `
})
export class QlUndoComponent implements OnInit {

  constructor(private editor: IceEditorComponent) {
  }

  ngOnInit() {
  }

  undo() {
    this.editor.quill.history.undo();
  }

}
