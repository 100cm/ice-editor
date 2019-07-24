import Quill from 'quill/core';

import Toolbar from 'quill/modules/toolbar';
import Embed from 'quill/blots/embed';
import TextBlot from 'quill/blots/text';
import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Underline from 'quill/formats/underline';
import Icons from 'quill/ui/icons';
import Code from 'quill/formats/code';
import {IceTheme} from './theme/ice-theme';
import {ColorStyle} from 'quill/formats/color';
import Strike from 'quill/formats/strike';
import {BackgroundStyle} from 'quill/formats/background';
import {Icelink} from './ql-link/ql-link.component';
import Image from 'quill/formats/image';
import {ImageResizer} from '../modules/image-resizer/image-resizer';
import Blockquote from 'quill/formats/blockquote';
import {QuillAttachmentEmbed} from './ql-attachments/attachment-format';
import {AlignStyle} from 'quill/formats/align';
import {IcePicker} from './ql-picker/ice-picker';
import {SizeStyle, SizeClass} from 'quill/formats/size';
import Scroll from 'quill/blots/scroll';
import Block, {BlockEmbed} from 'quill/blots/block';
import Parchment from 'parchment';
import Break from 'quill/blots/break';
import Cursor from 'quill/blots/cursor';
import Inline from 'quill/blots/inline';
import {DirectionAttribute, DirectionClass, DirectionStyle} from 'quill/formats/direction';
import {IceHeader} from './ql-header/ql-header';
import {IndentClass} from 'quill/formats/indent';
import {FontStyle, FontClass} from 'quill/formats/font';
import {IceFontEmbed} from './font-color/font-color-embed';
import Video from 'quill/formats/video';
import Clipboard from 'quill/modules/clipboard';
import {TableModule} from './ql-table/table-module';
import TableCell from './ql-table/TableCellBlot';
import TableRow from './ql-table/TableRowBlot';
import Table from './ql-table/TableBlot';
import ContainBlot from './ql-table/ContainBlot';
import {TbodyBlot} from './ql-table/tbody-blot';
import {TableInner} from './ql-table/table-inner';
import {TableContainer} from './ql-table/table-container';
import {TableColGroup} from './ql-table/table-col-group';
import {TableCol} from './ql-table/table-col';


Quill.register({
  'attributors/attribute/direction': DirectionAttribute,
  'attributors/class/direction': DirectionClass,
  'attributors/class/size': SizeClass,
  'attributors/style/size': SizeStyle,
  'attributors/style/font': FontStyle,
  'attributors/class/font': FontClass,
}, true);

Quill.register({
  'ui/picker': IcePicker,
  'modules/toolbar': Toolbar,
  'modules/clipboard': Clipboard,
  'modules/counter': ImageResizer,
  'modules/table': TableModule,
  'blots/embed': Embed,
  'blots/text': TextBlot,
  'blots/cursor': Cursor,
  'formats/ql-attachment': QuillAttachmentEmbed,
  'formats/ice-font': IceFontEmbed,
  'themes/snow': IceTheme,
  'formats/strike': Strike,
  'formats/align': AlignStyle,
  'formats/bold': Bold,
  'formats/blockquote': Blockquote,
  'formats/code': Code,
  'formats/underline': Underline,
  'formats/image': Image,
  'formats/italic': Italic,
  'formats/color': ColorStyle,
  'formats/video': Video,
  'formats/indent': IndentClass,
  'formats/background': BackgroundStyle,
  'formats/link': Icelink,
  'formats/header': IceHeader,
  'formats/size': SizeStyle,
  'formats/font': FontStyle,
  'ui/icons': Icons
});


const size = Quill.import('formats/size');
const font = Quill.import('formats/font');
size.whitelist = ['9px', '10px', '12px', '14px', '16px', '18px', '22px', '24px', '30px', '36px'];
font.whitelist = ['simsun', 'SimHei, STHeiti, sans-serif', 'microsoftyahei', 'Wingdings', '微软雅黑', 'FangSong, STFangsong, sans-serif', 'KaiTi, STKaiti, sans-serif', 'Arial, sans-serif',];
Parchment.register(Block, Break, Cursor, Inline, Scroll, TextBlot);


export {Quill as IceQuill};
