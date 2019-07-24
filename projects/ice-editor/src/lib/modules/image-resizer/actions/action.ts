// @flow

import {ImageResizer} from '../image-resizer';

export class Action {
  formatter: ImageResizer;

  constructor(formatter: ImageResizer) {
    this.formatter = formatter;
  }

  onCreate() {
  }

  onDestroy() {
  }

  onUpdate() {
  }
}
