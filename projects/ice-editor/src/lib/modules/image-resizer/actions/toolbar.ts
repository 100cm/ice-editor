
import {Aligner} from './aligner';
import {ImageResizer} from '../image-resizer';

export interface Toolbar {
  create(formatter: ImageResizer, alignmentHelper: Aligner): HTMLElement;

  destroy(): void;

  getElement(): HTMLElement;
}
