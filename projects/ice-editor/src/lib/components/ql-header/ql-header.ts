import Header from 'quill/formats/header';

export class IceHeader extends Header {

  static blotName = 'header';
  static tagName = ['p', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];


  static create(value) {
    if (['1', '2', '3'].includes(value)) {
      IceHeader.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    } else {
      IceHeader.tagName = ['P'];
    }
    const node = super.create(value);
    node.classList.add(`ql-heading-${value}`);
    return node;
  }

  static formats(domNode) {
    if (domNode.tagName === 'P') {
      return domNode.classList.value.split('ql-heading-')[1] || 'body';
    }
    return this.tagName.indexOf(domNode.tagName) + 1;
  }
}
