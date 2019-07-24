import Picker from 'quill/ui/picker';
import {dropdownIcon} from '../../icons/bold-icon';

export class IcePicker extends Picker {


  container;
  label;
  select;
  options;
  inputDiv;
  input;
  option;


  constructor(select, options = {}) {
    super(select);
    this.option = options || {};
  }

  togglePicker() {
    super.togglePicker();
  }

  buildItem(options): any {
    return super.buildItem(options);
  }

  buildOptions() {
    super.buildOptions();
  }

  buildPicker() {
    super.buildPicker();
  }

  escape() {
    super.escape();
  }

  close() {
    super.close();
  }

  selectItem(item, trigger = false) {
    super.selectItem(item, trigger);
  }

  update() {
    super.update();
  }

  buildLabel() {
    const option = this.option || {};
    const label = document.createElement('span');
    label.classList.add('ql-picker-label');
    label.innerHTML = option.icon || dropdownIcon;
    label.tabIndex = 0;
    label.setAttribute('data-label', option.label);
    label.setAttribute('role', 'button');
    label.setAttribute('aria-expanded', 'false');
    this.container.appendChild(label);
    return label;
  }
}
