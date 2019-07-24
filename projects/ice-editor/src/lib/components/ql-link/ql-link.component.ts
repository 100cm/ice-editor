import {Component, OnInit} from '@angular/core';
import Link, {sanitize} from 'quill/formats/link';

@Component({
  selector: 'ql-link',
  templateUrl: './ql-link.component.html',
  styleUrls: ['./ql-link.component.css']
})
export class QlLinkComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}


export class Icelink extends Link {

  static blotName = 'link';
  static tagName = 'A';
  static SANITIZED_URL = 'about:blank';
  static PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];

  domNode;

  static create(value) {
    const node = super.create(value);
    node.setAttribute('href', value);
    node.setAttribute('data-link-type', 'resource');
    node.classList.add('ice-link');
    return node;
  }

  static formats(domNode) {
    return domNode.getAttribute('href');
  }

  static sanitize(url) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  }

  format(name, value) {
    if (name !== Icelink.blotName || !value) {
      return super.format(name, value);
    }
    value = Icelink.sanitize(value);
    this.domNode.setAttribute('href', value);
  }


}
