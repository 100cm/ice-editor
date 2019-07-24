/* tslint:disable:no-trailing-whitespace max-line-length */
import {ImageSpec} from './specs/image-spec';
import IframeVideoSpec from './specs/Iframe-video-spec';
import {alignCenterIcon, alignLeftIcon, alignRightIcon} from '../../icons/bold-icon';

export interface OverlayOptions {
  // classname applied to the overlay element
  className: string;
  // style applied to overlay element, or null to prevent styles
  style?: any;
}

export interface ResizeOptions {
  // class name applied to the resize handles
  handleClassName: string;
  // style applied to resize handles, or null to prevent styles
  handleStyle?: any;
}

export interface AlignOptions {
  // the name of the attribute for an element that has its alignment changed
  attribute: string;
  // the aligner does the actual alignment switch
  aligner: {
    // whether or not the aligner should handle the actual alignment properties
    applyStyle: boolean,
  };
  // icons used for alignment
  icons: {
    left: string,
    center: string,
    right: string,
  };
  // the toolbar so users can change alignments
  toolbar: {
    // whether or not users can deselect an alignment. it's up to you to set the initial alignment
    allowDeselect: boolean,
    // class name applied to the root toolbar element
    mainClassName: string,
    // style applied to root toolbar element, or null to prevent styles
    mainStyle: any,
    // class name applied to each button in the toolbar
    buttonClassName: string,
    /* whether or not to add the selected style to the buttons.
    they'll always get the is-selected class */
    addButtonSelectStyle: boolean,
    // style applied to buttons, or null to prevent styles
    buttonStyle: any,
// style applied to the svgs in the buttons
    svgStyle: any,
  };
}


export interface Options {
  // the BlotSpecs supported
  specs: any[];
  overlay: OverlayOptions;
  align: AlignOptions;
  resize: ResizeOptions;
}

export const DefaultOptions: Options = {
  specs: [
    ImageSpec,
    IframeVideoSpec,
  ],
  overlay: {
    className: 'blot-formatter__overlay',
    style: {
      position: 'absolute',
      boxSizing: 'border-box',
      border: '1px dashed #444',
    },
  },
  align: {
    attribute: 'data-align',
    aligner: {
      applyStyle: true,
    },
    icons: {
      left: alignLeftIcon,
      center: alignCenterIcon,
      right: alignRightIcon,
    },
    toolbar: {
      allowDeselect: true,
      mainClassName: 'ql-gallery-toolbar',
      mainStyle: {
        position: 'absolute',
        left: '50%',
        top: '-50px',
        minWidth: '200px',
        transform: 'translateX(-50%)'

      },
      buttonClassName: 'ql-gallery-layout',
      addButtonSelectStyle: true,
      buttonStyle: {
        display: 'inline-block',
        width: '24px',
        height: '24px',
        background: 'white',
        border: '1px solid #999',
        verticalAlign: 'middle',
      },
      svgStyle: {
        display: 'inline-block',
        width: '24px',
        height: '24px',
        verticalAlign: 'middle',
      },
    },
  },
  resize: {
    handleClassName: 'blot-formatter__resize-handle',
    handleStyle: {
      position: 'absolute',
      height: '12px',
      width: '12px',
      background: '#41464b',
      border: '2px solid #fff',
      boxSizing: 'content-box',
      boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.45)',
      backgroundColor: '#41464b',
      borderRadius: '10px',
      opacity: '0.80',
    },
  },
};

