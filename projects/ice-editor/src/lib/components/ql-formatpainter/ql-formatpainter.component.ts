import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ql-formatpainter',
  template: `
    <button class="ql-formatpainter" type="button">
      <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           x="0px" y="0px" viewBox="0 0 30 27" style="enable-background:new 0 0 30 27" xml:space="preserve"> <desc>Created with Sketch.</desc>
        <g
          id="Page-1"> <g id="格式刷-1x"> <g id="btn3" transform="translate(9.000000, 7.000000)"> <path id="Combined-Shape"
                                                                                                     d="M6,7V6h5.5H12V1h-0.5H10V0H0v4h10V2h1v3H5v0.5V7H4v6h3V7H6z"></path> </g> </g> </g> </svg>
    </button>`,
  styleUrls: ['./ql-formatpainter.component.css']
})
export class QlFormatpainterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
