/* tslint:disable:no-trailing-whitespace max-line-length */
import {Component, ElementRef, NgZone, OnInit} from '@angular/core';
import {ImageResizer} from './modules/image-resizer/image-resizer';
import SnowTheme from 'quill/themes/snow';

import {
  alignCenterIcon, alignJustifyIcon,
  alignLeftIcon, alignRightIcon,
  backrgoundIcon, blockquoteIcon,
  boldIcon,
  cleanIcon, codeIcon,
  colorIcon,
  headerIcon,
  iIcon,
  imageIcon, indentIcon,
  linkIcon,
  orderIcon, outdentIcon,
  sIcon,
  uIcon
} from './icons/bold-icon';
import {IceQuill} from './components/quill';
import {IceTheme, IceTooltip} from './components/theme/ice-theme';

@Component({
  selector: 'ice-editor',
  template: `
    <div id="toolbar-wrapper" class="toolbar-wrapper">
      <div class="ql-toolbar-default">
    <span class="ql-formats">
      <ql-redo></ql-redo>
      <ql-undo></ql-undo>
      <button class="ql-clean" type="button"></button>
      <ql-header></ql-header>
       <ql-font-size></ql-font-size>
       <ql-font></ql-font>
    </span>
        <span class="ql-formats">
      <button type="button" class="ql-bold"></button>
      <button type="button" class="ql-italic"></button>
      <button type="button" class="ql-underline"></button>
      <button type="button" class="ql-strike"></button>
       <ql-color-item-list></ql-color-item-list>
        <ql-background></ql-background>
    </span>
        <span class="ql-formats">
      <ql-align></ql-align>
      <button class="ql-indent" value="+1"></button>
      <button class="ql-indent" value="-1"></button>
      <ql-insert></ql-insert>
    
    </span>

      </div>
    </div>
    <div id="editor" class="ql-container ql-snow dropzone">
      <p>Hello World!</p>
      <p>Some initial <strong>bold</strong> text</p>
      <p><br></p>
    </div>

  `,
  styles: []
})
export class IceEditorComponent implements OnInit {


  quill;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {

  }

  setIcon() {
    const icons = IceQuill.import('ui/icons');
    icons['bold'] = boldIcon;
    icons['italic'] = iIcon;
    icons['underline'] = uIcon;
    icons['strike'] = sIcon;
    icons['color'] = colorIcon;
    icons['image'] = imageIcon;
    icons['dropdown'] = orderIcon;
    icons['background'] = backrgoundIcon;
    icons['clean'] = cleanIcon;
    icons['header'] = headerIcon;
    icons['link'] = linkIcon;
    icons['blockquote'] = blockquoteIcon;
    icons['code-block'] = codeIcon;
    icons['align'][''] = alignLeftIcon;
    icons['align']['center'] = alignCenterIcon;
    icons['align']['right'] = alignRightIcon;
    icons['align']['justify'] = alignJustifyIcon;
    icons['indent'] = indentIcon;
    icons['outdent'] = outdentIcon;
  }


  ngOnInit(): void {
    this.setIcon();
    // IceQuill.register('themes/snow', SnowTheme);
    this.ngZone.runOutsideAngular(() => {
      this.quill = new IceQuill('#editor', {
        theme: 'snow',
        modules: {
          table: true,
          history: {
            delay: 200,
            maxStack: 500,
          },
          toolbar: {
            container: '#toolbar-wrapper',
            handlers: {}
          },
          counter: {},
        }
      });
      const toolbar = this.quill.getModule('toolbar');
      // this.quill.theme.tooltip = new IceTooltip(this.quill, this.quill.theme.options.bounds);
      document.querySelector('#editor').addEventListener('mouseover', () => {
        // this.quill.theme.tooltip.show();
      });
      toolbar.container.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'INPUT') {
          e.target.focus();
          e.preventDefault();
        } else {
          e.preventDefault();
        }
        // e.preventDefault();
      });
      this.quill.root.addEventListener('blur', (e) => {
        e.preventDefault();
      });
    });


  }

}
