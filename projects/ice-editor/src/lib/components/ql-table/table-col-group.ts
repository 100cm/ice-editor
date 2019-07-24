import ContainBlot from './ContainBlot';
import Parchment from 'parchment';

export class TableColGroup extends ContainBlot {
  static blotName = 'col-group';
  static tagName = 'colgroup';
  static scope = Parchment.Scope.BLOCK_BLOT;
  static defaultChild = 'block';

  static create(options) {
    const node = super.create(options);
    return node;
  }

  optimize(context) {
    super.optimize(context);
  }
}
