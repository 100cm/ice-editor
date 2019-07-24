import {IceQuill as Quill} from '../quill';

let Container = Quill.import('blots/container');
let Block = Quill.import('blots/block');
let BlockEmbed = Quill.import('blots/block/embed');
let Parchment = Quill.import('parchment');

class ContainBlot extends Container {

  static blotName = 'contain';
  static tagName = 'contain';
  static scope = Parchment.Scope.BLOCK_BLOT;
  static defaultChild = 'block';
  static allowedChildren = [Block, BlockEmbed, Container];
  domNode;
  statics;
  parent;
  next;
  children;

  constructor(domNode) {
    super(domNode);
  }

  appendChild(child) {
    super.appendChild(child);
  }

  replace(a) {
    super.replace(a);
  }

  getAttribute(id) {
    super.getAttribute(id);
  }

  remove() {
    super.remove();
  }

  static create(value) {
    return super.create(value);
  }

  optimize(context) {
    super.optimize(context);
  }

  insertBefore(childBlot, refBlot) {
    super.insertBefore(childBlot, refBlot);
  }

  formats(domNode) {
    if (domNode) {
      return domNode.tagName;
    }
    return this.domNode.tagName;
  }

  format(name?, value?) {
    super.format();
  }

}


export default ContainBlot;
