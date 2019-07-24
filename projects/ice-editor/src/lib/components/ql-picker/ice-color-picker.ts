/* tslint:disable:no-bitwise */
import {IcePicker} from './ice-picker';
import {dropdownIcon} from '../../icons/bold-icon';
import Delta from 'quill-delta';
import {IceQuill} from '../quill';

export class IceColorPicker extends IcePicker {

  rangeColor;
  quill;
  format;
  label;
  select;
  inputDiv;
  options;
  input;
  colorRect;
  close;

  constructor(select, label, quill, format) {
    super(select);
    this.label.innerHTML = label;
    this.quill = quill;
    this.format = format;
    this.container.classList.add('ql-color-picker');
    [].slice.call(this.container.querySelectorAll('.ql-picker-item'), 0, 7).forEach((item) => {
      item.classList.add('ql-primary');
    });
    this.quill.on('selection-change', (range, oldRange, source) => {
      if (range) {
        this.rangeColor = this.quill.getFormat(range);
        this.checkRange();
      }
    });
    this.label.querySelector('.color-icon').addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const colorLabel = this.label.querySelector('.ql-color-label');
      this.quill.format(this.format, colorLabel.getAttribute('data-value'));
    });
  }

  checkRange() {
    if (this.rangeColor && this.rangeColor[this.format]) {
      const color = this.rangeColor[this.format];
      const options = Array.from(this.options.querySelectorAll('.ql-picker-item'));
      const option = options.find((op: any) => {
        return op.getAttribute('data-value') === color;
      });
      this.input.value = color.slice(1);
      this.colorRect.style.backgroundColor = color;
      this.setLabelIconValue(color);
      // 如果option存在
      if (option) {
        this.selectItem(option);
      }
    }
  }

  buildLabel() {
    const label = document.createElement('span');
    label.classList.add('ql-picker-label');
    label.innerHTML = dropdownIcon;
    label.tabIndex = 0;
    label.setAttribute('role', 'button');
    label.setAttribute('aria-expanded', 'false');
    this.container.appendChild(label);
    this.buildInput();
    return label;
  }

  selectItem(item, trigger = false) {
    super.selectItem(item, trigger);
    const value = item ? item.getAttribute('data-value') || '' : '';
    this.setLabelIconValue(value);
    this.input.value = value.slice(1);
    this.colorRect.style.backgroundColor = value;
  }

  setLabelIconValue(value) {
    const colorLabel = this.label.querySelector('.ql-color-label');
    if (colorLabel) {
      colorLabel.setAttribute('data-value', value);
      if (colorLabel.tagName === 'line') {
        colorLabel.style.stroke = value;
      } else {
        colorLabel.style.fill = value;
      }
    }
  }

  buildInput() {
    this.inputDiv = document.createElement('span');
    this.inputDiv.classList.add('color-input-wrap');
    this.inputDiv.innerHTML = `<span class="color-rect"></span><label class="color-label">#</label>
    <input type="text" class="color-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="6" >`;
    this.input = this.inputDiv.querySelector('input');
    this.colorRect = this.inputDiv.querySelector('.color-rect');
    this.input.addEventListener('focus', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.target.value = this.input.value;
    });
    this.input.addEventListener('keyup', (e) => {
      const color = this.input.value;
      this.colorRect.style.backgroundColor = '#' + this.input.value;
      if (e.keyCode === 13) {
        e.target.setAttribute('data-value', this.input.value);
        this.quill.format(this.format, '#' + color);
        e.target.value = color;
        this.colorRect.style.backgroundColor = '#' + this.input.value;
        this.rangeColor = {color: '#' + color};
        this.setLabelIconValue('#' + color);
        this.close();
      }
    });
  }

  buildItem(option) {
    const item = super.buildItem(option);
    item.style.backgroundColor = option.getAttribute('value') || '';
    const color = option.getAttribute('value');
    const light = this.getLight(color);
    item.setAttribute('data-light', light);
    const name = option.getAttribute('data-name');
    const spanName = document.createElement('span');
    spanName.classList.add('color-name-tip');
    spanName.innerText = name;
    item.setAttribute('data-name', name);
    item.append(spanName);
    return item;
  }

  buildOptions() {
    super.buildOptions();
    this.options.removeAttribute('tabindex');
    this.options.removeAttribute('aria-hidden');
    this.options.appendChild(this.inputDiv);
  }


  getLight(color: string) {
    if (color) {
      const color16 = +('0x' + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

      const r = color16 >> 16;
      const g = color16 >> 8 & 255;
      const b = color16 & 255;
      const hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
      );
      if (hsp > 127.5) {
        return 'light';
      } else {

        return 'dark';
      }
    } else {
      return 'light';
    }
  }

  update() {
    let option;
    if (this.select.selectedIndex > -1) {
      let item = this.container.querySelector('.ql-picker-options').children[this.select.selectedIndex];
      option = this.select.options[this.select.selectedIndex];
      this.selectItem(item);
    } else {
      this.selectItem(null);
    }
    let isActive = option != null && option !== this.select.querySelector('option[selected]');
    this.label.classList.toggle('ql-active', isActive);
    this.checkRange();
  }

}
