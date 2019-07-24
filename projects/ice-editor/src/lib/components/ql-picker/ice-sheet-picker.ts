import {IceHoverPicker} from './ice-hover-picker';

export class IceSheetPicker extends IceHoverPicker {

  row = 1;
  col = 1;
  sizeLabel;

  buildItem(option) {
    const item = super.buildItem(option);
    item.style.backgroundColor = option.getAttribute('value') || '';
    item.setAttribute('data-row', option.getAttribute('data-row'));
    item.setAttribute('data-col', option.getAttribute('data-col'));
    const name = option.getAttribute('data-name');
    item.addEventListener('mouseenter', (e) => {
      const row = e.target.getAttribute('data-row');
      const col = e.target.getAttribute('data-col');
      this.sizeLabel.innerHTML = `${col} * ${row}`;
      Array.from(this.options.querySelectorAll('.ql-picker-item')).forEach((optionDom: any) => {
        const optionRow = parseInt(optionDom.getAttribute('data-row'));
        const optionCol = parseInt(optionDom.getAttribute('data-col'));
        if (optionRow <= row && optionCol <= col) {
          optionDom.classList.add('picker-item-active');
        } else {
          optionDom.classList.remove('picker-item-active');
        }
      });
      e.target.classList.add('picker-item-active');
    });
    return item;
  }

  selectItem(item, trigger = false) {
    const selected = this.container.querySelector('.ql-selected');
    if (item === selected) {
      return;
    }
    if (selected != null) {
      selected.classList.remove('ql-selected');
    }
    if (item == null) {
      return;
    }
    item.classList.add('ql-selected');
    this.select.selectedIndex = [].indexOf.call(item.parentNode.children, item);
    if (item.hasAttribute('data-value')) {
      this.label.setAttribute('data-value', item.getAttribute('data-value'));
    } else {
      this.label.removeAttribute('data-value');
    }
    // if (item.hasAttribute('data-label')) {
    //   this.label.setAttribute('data-label', item.getAttribute('data-label'));
    // } else {
    //   this.label.removeAttribute('data-label');
    // }
    if (trigger) {
      if (typeof Event === 'function') {
        this.select.dispatchEvent(new Event('change'));
      } else if (typeof Event === 'object') {     // IE11
        const event = document.createEvent('Event');
        event.initEvent('change', true, true);
        this.select.dispatchEvent(event);
      }
      this.close();
    }
  }

  buildLabel(): HTMLSpanElement {
    const label = document.createElement('span');
    label.classList.add('ql-picker-label');
    label.tabIndex = 0;
    label.setAttribute('role', 'button');
    label.setAttribute('aria-expanded', 'false');
    label.setAttribute('data-label', '表格');
    this.container.appendChild(label);
    return label;
  }

  buildOptions() {
    const row = 7;
    const col = 7;
    for (let i = 1; i <= row; i++) {
      for (let k = 1; k <= col; k++) {
        const option = document.createElement('option');
        option.value = `newtable_${i}_${k}`;
        option.setAttribute('data-row', i.toString());
        option.setAttribute('data-col', k.toString());
        this.select.appendChild(option);
      }
    }
    super.buildOptions();
    this.buildTableSizeLable();
  }

  buildTableSizeLable() {
    this.sizeLabel = document.createElement('div');
    this.sizeLabel.innerHTML = '1 * 1';
    this.sizeLabel.classList.add('ql-sheet-size-label');
    this.options.appendChild(this.sizeLabel);
  }


}
