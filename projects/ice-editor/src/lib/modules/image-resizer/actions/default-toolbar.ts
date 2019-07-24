import {Toolbar} from './toolbar';
import {Aligner} from './aligner';
import {Alignment} from './alignment';
import {ImageResizer} from '../image-resizer';

export default class DefaultToolbar implements Toolbar {
  toolbar: HTMLElement;
  buttons: HTMLElement[];

  constructor() {
    this.toolbar = null;
    this.buttons = [];
  }

  create(formatter: ImageResizer, aligner: Aligner): HTMLElement {
    const toolbar = document.createElement('div');
    toolbar.classList.add(formatter.options.align.toolbar.mainClassName);
    this.addToolbarStyle(formatter, toolbar);
    this.addButtons(formatter, toolbar, aligner);

    this.toolbar = toolbar;
    return this.toolbar;
  }

  destroy() {
    this.toolbar = null;
    this.buttons = [];
  }

  getElement() {
    return this.toolbar;
  }

  addToolbarStyle(formatter: ImageResizer, toolbar: HTMLElement) {
    if (formatter.options.align.toolbar.mainStyle) {
      Object.assign(toolbar.style, formatter.options.align.toolbar.mainStyle);
    }
  }

  addButtonStyle(button: HTMLElement, index: number, formatter: ImageResizer) {
    if (formatter.options.align.toolbar.buttonStyle) {
      Object.assign(button.style, formatter.options.align.toolbar.buttonStyle);
      if (index > 0) {
        button.style.borderLeftWidth = '0'; // eslint-disable-line no-param-reassign
      }
    }

    if (formatter.options.align.toolbar.svgStyle) {
      Object.assign((button.children[0] as HTMLElement).style, formatter.options.align.toolbar.svgStyle);
    }
  }

  addButtons(formatter: ImageResizer, toolbar: HTMLElement, aligner: Aligner) {
    const span = document.createElement('span');
    span.classList.add('ql-gallery-formats');
    span.classList.add('layout');
    aligner.getAlignments().forEach((alignment, i) => {
      const button = document.createElement('button');
      button.innerHTML = alignment.icon;
      button.classList.add('ql-gallery-layout');
      button.addEventListener('click', () => {
        this.onButtonClick(button, formatter, alignment, aligner);
      });
      this.preselectButton(button, alignment, formatter, aligner);
      this.buttons.push(button);
      span.appendChild(button);
    });
    toolbar.appendChild(span);
  }

  preselectButton(
    button: HTMLElement,
    alignment: Alignment,
    formatter: ImageResizer,
    aligner: Aligner,
  ) {
    if (!formatter.currentSpec) {
      return;
    }

    const target = formatter.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    if (aligner.isAligned(target, alignment)) {
      this.selectButton(formatter, button);
    }
  }

  onButtonClick(
    button: HTMLElement,
    formatter: ImageResizer,
    alignment: Alignment,
    aligner: Aligner,
  ) {
    if (!formatter.currentSpec) {
      return;
    }

    const target = formatter.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    this.clickButton(button, target, formatter, alignment, aligner);
  }

  clickButton(
    button: HTMLElement,
    alignTarget: HTMLElement,
    formatter: ImageResizer,
    alignment: Alignment,
    aligner: Aligner,
  ) {
    this.buttons.forEach((b) => {
      this.deselectButton(formatter, b);
    });
    if (aligner.isAligned(alignTarget, alignment)) {
      if (formatter.options.align.toolbar.allowDeselect) {
        aligner.clear(alignTarget);
      } else {
        this.selectButton(formatter, button);
      }
    } else {
      this.selectButton(formatter, button);
      alignment.apply(alignTarget);
    }

    formatter.update();
  }

  selectButton(formatter: ImageResizer, button: HTMLElement) {
    button.classList.add('ql-gallery-active');
    if (formatter.options.align.toolbar.addButtonSelectStyle) {
      // button.style.setProperty('filter', 'invert(10%)');
    }
  }

  deselectButton(formatter: ImageResizer, button: HTMLElement) {
    button.classList.remove('ql-gallery-active');
    if (formatter.options.align.toolbar.addButtonSelectStyle) {
      // button.style.removeProperty('filter');
    }
  }
}
