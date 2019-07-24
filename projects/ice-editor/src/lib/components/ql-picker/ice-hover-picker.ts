import {IcePicker} from './ice-picker';

export class IceHoverPicker extends IcePicker {

  container;
  lmo;
  lml;
  omo;
  oml;
  option = {};

  constructor(select, options: any = {}) {
    super(select);
    this.option = options || {};
    this.label.innerHTML = options.label;
    this.insertArrow();
    this.label.addEventListener('mouseover', () => {
      clearTimeout(this.lml);
      clearTimeout(this.oml);
      this.container.classList.add('ql-expanded');
    });
    this.label.addEventListener('mouseleave', () => {
      this.lml = setTimeout(_ => {
        this.container.classList.remove('ql-expanded');
      }, 200);
    });
    this.options.addEventListener('mouseleave', () => {
      this.oml = setTimeout(_ => {
        this.container.classList.remove('ql-expanded');
      }, 200);
    });
    this.options.addEventListener('mouseover', () => {
      clearTimeout(this.lml);
      clearTimeout(this.oml);
      this.container.classList.add('ql-expanded');
    });
  }


  buildLabel() {
    const label = document.createElement('span');
    label.classList.add('ql-picker-label');
    label.tabIndex = 0;
    label.setAttribute('role', 'button');
    label.setAttribute('aria-expanded', 'false');
    this.container.appendChild(label);
    return label;
  }

  insertArrow() {
    const i = document.createElement('i');
    i.classList.add('ql-picker-arrow');
    this.label.appendChild(i);
  }

  buildPicker() {
    [].slice.call(this.select.attributes).forEach((item) => {
      this.container.setAttribute(item.name, item.value);
    });
    this.container.classList.add('ql-hover-picker');
    this.label = this.buildLabel();
    this.buildOptions();
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
  }
}
