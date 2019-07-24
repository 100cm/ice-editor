import ContainBlot from './ContainBlot';
import Parchment from 'parchment';
import Block from 'quill/blots/block';

const COL_ATTRIBUTES = ['width'];
const COL_DEFAULT = {
  width: 100
};

export class TableCol extends ContainBlot {
  static blotName = 'col';
  static tagName = 'col';
  static scope = Parchment.Scope.BLOCK_BLOT;
  domNode;


  static create(value) {
    let node = super.create(value);
    COL_ATTRIBUTES.forEach(attrName => {
      node.setAttribute(`${attrName}`, value[attrName] || COL_DEFAULT[attrName]);
    });
    return node;
  }

  static formats(domNode: any) {

    const a = COL_ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(`${attribute}`)) {
        formats[attribute] =
          domNode.getAttribute(`${attribute}`) || undefined;
      }
      return formats;
    }, {});
    return COL_ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(`${attribute}`)) {
        formats[attribute] =
          domNode.getAttribute(`${attribute}`) || undefined;
      }
      return formats;
    }, {});
  }

  format(name, value) {
    if (COL_ATTRIBUTES.indexOf(name) > -1) {
      this.domNode.setAttribute(`${name}`, value || COL_DEFAULT[name]);
    } else {
      super.format(name, value);
    }
  }

}
