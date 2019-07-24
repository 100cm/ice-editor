/* tslint:disable:no-string-literal */
import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import Quill from 'quill/core/quill';
import {ImageResizer} from '../../projects/ice-editor/src/lib/modules/image-resizer/image-resizer';
import {
  backrgoundIcon,
  boldIcon, cleanIcon,
  colorIcon,
  iIcon,
  imageIcon,
  orderIcon,
  sIcon,
  uIcon
} from '../../projects/ice-editor/src/lib/icons/bold-icon';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  quill;

  constructor(private elementRef: ElementRef) {

  }


  ngOnInit(): void {

  }
}
