import {IceQuill} from '../quill';

import Embed from 'quill/blots/embed';

export class QuillAttachmentEmbed extends Embed {
  static blotName = 'ql-attachment';
  static className = ['ql-blot-attachment'];
  static tagName = 'p';

  static create(value) {
    const node = super.create(value);
    node.classList.add('ql-align-center');
    node.innerHTML = `<span  class="ql-attachment-wrapper" draggable="true" >
      <span class="ql-attachment-title-icon hicon icon-attachment attachment-title-icon"></span>
      <span class="ql-attachment-file-info">
        <span class="ql-attachment-file-name">${value.name}</span>
        <span class="ql-attachment-file-size">${value.size}</span>
      </span>
      <a href="${value.url}" target="_blank" class="ql-attachment-file-url attachment-download-link" onclick="event.preventDefault();"></a>
    </span>`;

    return node;
  }

}
