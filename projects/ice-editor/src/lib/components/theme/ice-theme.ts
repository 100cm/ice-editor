import SnowTheme, {SnowTooltip} from 'quill/themes/snow';
import Quill from 'quill';
import Emitter from 'quill';
import {Range} from 'quill/core/selection';
import Inline from 'quill';
import {BaseTooltip} from 'quill/themes/base';
import {IceQuill} from '../quill';
import extend from 'extend';
import BaseTheme from 'quill/themes/base';
import {Icelink} from '../ql-link/ql-link.component';
import IconPicker from 'quill/ui/icon-picker';
import {IcePicker} from '../ql-picker/ice-picker';
import {IceColorPicker} from '../ql-picker/ice-color-picker';
import {mediaIcon, tableIcon} from '../../icons/bold-icon';
import {IceHoverPicker} from '../ql-picker/ice-hover-picker';
import {IceSheetPicker} from '../ql-picker/ice-sheet-picker';

const ALIGNS = [false, 'center', 'right', 'justify'];

const COLORS = [
  '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff',
  '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff',
  '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff',
  '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2',
  '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'
];

const FONTS = [false, 'serif', 'monospace'];

const HEADERS = ['1', '2', '3', false];

const SIZES = ['small', false, 'large', 'huge'];

export class IceTheme extends SnowTheme {

  buildButtons;
  pickers;

  linkHandle(value) {
    if (value) {
      const range = this['quill'].getSelection();
      if (range == null || range.length === 0) {
        return;
      }
      let preview = this.quill.getText(range);
      if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
        preview = 'mailto:' + preview;
      }
      const tooltip = this.quill.theme.tooltip;
      tooltip.edit('link', preview);
    } else {
      this['quill'].format('link', false);
    }
  }

  fillSelect(select, values, defaultValue: any = false) {
    values.forEach((value) => {
      const option = document.createElement('option');
      if (value === defaultValue) {
        option.setAttribute('selected', 'selected');
      } else {
        option.setAttribute('value', value);
      }
      select.appendChild(option);
    });
  }

  buildPickers(selects, icons) {
    this.pickers = selects.map((select) => {
      if (select.classList.contains('ql-align')) {
        if (select.querySelector('option') == null) {
          this.fillSelect(select, ALIGNS);
        }
        return new IconPicker(select, icons.align);
      } else if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
        const format = select.classList.contains('ql-background') ? 'background' : 'color';
        if (select.querySelector('option') == null) {
          this.fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000');
        }
        return new IceColorPicker(select, icons[format], this.quill, format);
      } else if (select.classList.contains('ql-hover-picker')) {
        if (select.classList.contains('ql-sheet')) {
          return new IceSheetPicker(select, {label: tableIcon});
        } else {
          return new IceHoverPicker(select, {label: mediaIcon});
        }
      } else {
        if (select.querySelector('option') == null) {
          if (select.classList.contains('ql-font')) {
            this.fillSelect(select, FONTS);
          } else if (select.classList.contains('ql-header')) {
            this.fillSelect(select, HEADERS);
          } else if (select.classList.contains('ql-size')) {
            this.fillSelect(select, SIZES);
          }
        }
        return new IcePicker(select);
      }
    });
    const update = () => {
      this.pickers.forEach((picker) => {
        picker.update();
      });
    };
    this.quill.on(Emitter.events.EDITOR_CHANGE, update);
  }

  tooltip;
  quill;
  options: any;

  extendToolbar(toolbar) {
    const icons = IceQuill.import('ui/icons');
    toolbar.container.classList.add('ql-snow');
    // you could override Quill's icons here with yours if you want
    this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), icons);
    this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), icons);
    this.tooltip = new IceTooltip(this.quill, this.options.bounds);
    if (toolbar.container.querySelector('.ql-link')) {
      this.quill.keyboard.addBinding({key: 'K', shortKey: true}, (range, context) => {
        toolbar.handlers['link'].call(toolbar, !context.format.link);
      });
    }
  }


}

IceTheme['DEFAULTS'] = extend(true, {}, BaseTheme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(value) {
          if (value) {
            const tooltip = this.quill.theme.tooltip;
            const range = this.quill.getSelection();
            if (range == null || range.length === 0) {
              tooltip.edit('blank-link', null);
              return;
            }
            let preview = this.quill.getText(range);
            if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
              preview = 'mailto:' + preview;
            }
            tooltip.edit('link', preview);
          } else {
            this.quill.format('link', false);
          }
        },
        media(value) {
          const tooltip = this.quill.theme.tooltip;
          if (value === 'online-media') {
            tooltip.edit('video', null);
          } else {
            tooltip.chooseFile('media', null);
          }
        }
      }
    }
  }
});

export class IceTooltip extends BaseTooltip {
  constructor(quill, bounds) {
    super(quill, bounds);
  }

  static TEMPLATE = [
    '<input type="text" data-formula="e=mc^2" data-link="输入你的网址" placeholder="输入你的地址" data-video="Embed URL">',
    '<input type="file" class="media-file" style="display: none">',
    '<a class="ql-remove">' +
    '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 56 56" style="enable-background:new 0 0 56 56" xml:space="preserve"> <desc>Created with Sketch.</desc> <g id="Artboard-6-Copy"> <g id="Group-Copy-3" transform="translate(12.000000, 16.000000)"> <g id="停用链接-copy-7"> <linearGradient id="Combined-Shape_1_unlink" gradientUnits="userSpaceOnUse" x1="-1357.0938" y1="693.5938" x2="-1357.0938" y2="692.5938" gradientTransform="matrix(32 0 0 -24.5255 43443 17011.459)"> <stop offset="0" style="stop-color:#676b6f"></stop> <stop offset="1" style="stop-color:#a0a2a5"></stop> </linearGradient> <path id="Combined-Shape" style="fill:url(#Combined-Shape_1_unlink)" d="M25.263,20l3,3L26,25.263L9.937,9.2H7\n' +
    '\t\t\t\tc-2.099,0-3.8,1.701-3.8,3.8s1.701,3.8,3.8,3.8h4.481c0.059,0.067,0.12,0.133,0.184,0.198l2.621,2.621\n' +
    '\t\t\t\tC13.57,19.866,12.8,20,12,20H7c-3.866,0-7-3.134-7-7c0-3.78,2.995-6.86,6.742-6.995L3.737,3L6,0.737L22.063,16.8h3.345\n' +
    '\t\t\t\tc1.874,0,3.392-1.701,3.392-3.8s-1.519-3.8-3.392-3.8h-5.244l-2.659-2.864C18.133,6.118,18.804,6,19.5,6h6\n' +
    '\t\t\t\tc3.59,0,6.5,3.134,6.5,7s-2.91,7-6.5,7H25.263z"></path> </g> </g> </g> </svg>' +
    '</a>'
  ].join('');
  root;
  quill;

  save() {
    let value = this.textbox.value;
    switch (this.root.getAttribute('data-mode')) {
      case 'link': {
        const scrollTop = this.quill.root.scrollTop;
        if (this.linkRange) {
          this.quill.formatText(this.linkRange, 'link', value, Emitter.sources.USER);
          delete this.linkRange;
        } else {
          this.restoreFocus();
          this.quill.format('link', value, Emitter.sources.USER);
        }
        this.quill.root.scrollTop = scrollTop;
        break;
      }
      case 'blank-link': {
        const delta = {
          ops: [
            {retain: this.quill.getSelection(true)['index']},
            {insert: value, attributes: {link: value}}
          ]
        };
        this.quill.updateContents(delta);
        break;
      }
      case 'video': {
        value = this.extractVideoUrl(value);
      }
      // eslint-disable-next-line no-fallthrough
      case 'media': {
        value = this.extractVideoUrl(value);
      }
      case 'formula': {
        if (!value) {
          break;
        }
        const range = this.quill.getSelection(true);
        if (range != null) {
          const index = range.index + range.length;
          this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, Emitter.sources.USER);
          if (this.root.getAttribute('data-mode') === 'formula') {
            this.quill.insertText(index + 1, ' ', Emitter.sources.USER);
          }
          this.quill.setSelection(index + 2, Emitter.sources.USER);
        }
        break;
      }
      default:
    }
    this.textbox.value = '';
    this.hide();
  }

  extractVideoUrl(url) {
    let match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
      url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return (match[1] || 'https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
    }
    if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {  // eslint-disable-line no-cond-assign
      return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
    }
    return url;
  }


  preview;
  linkRange;
  restoreFocus;
  hide;
  position;
  textbox;

  listen() {
    super.listen();
    this.root.querySelector('a.ql-remove').addEventListener('click', (event) => {
      if (this.linkRange != null) {
        let range = this.linkRange;
        this.restoreFocus();
        this.quill.formatText(range, 'link', false, Emitter.sources.USER);
        this.textbox.value = '';
        delete this.linkRange;
      }
      event.preventDefault();
      this.hide();
    });
    this.quill.on(Emitter.events.SELECTION_CHANGE, (range, oldRange, source) => {
      if (range == null) {
        return;
      }
      if (range.length === 0 && source === Emitter.sources.USER) {
        const [link, offset] = this.quill.scroll.descendant(Icelink, range.index);
        if (link != null) {
          this.linkRange = new Range(range.index - offset, link.length());
          const preview = Icelink.formats(link.domNode);
          this.textbox.value = preview;
          this.show();
          this.position(this.quill.getBounds(this.linkRange));
          this.root.setAttribute('data-mode', 'link');
          return;
        }
      } else {
        delete this.linkRange;
      }
      this.hide();
    });
  }

  edit(mode = 'link', preview = null) {
    console.log('edit tool link');
    this.root.classList.remove('ql-hidden');
    this.root.classList.add('ql-editing');
    if (preview != null) {
      this.textbox.value = preview;
    } else if (mode !== this.root.getAttribute('data-mode')) {
      this.textbox.value = '';
    }
    this.position(this.quill.getBounds(this.quill.selection.savedRange));
    this.textbox.select();
    this.textbox.setAttribute('placeholder', this.textbox.getAttribute(`data-${mode}`) || '');
    this.root.setAttribute('data-mode', mode);
  }

  chooseFile() {

  }

  show() {
    super.show();
    this.root.removeAttribute('data-mode');
  }


}


