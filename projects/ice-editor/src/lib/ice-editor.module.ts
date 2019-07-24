import {NgModule} from '@angular/core';
import {IceEditorComponent} from './ice-editor.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ColorItemListComponent} from './components/color-item-list/color-item-list.component';
import {QlHeaderComponent} from './components/ql-header/ql-header.component';
import {QlInsertComponent} from './components/ql-insert/ql-insert.component';
import {QlOrderListComponent} from './components/ql-order-list/ql-order-list.component';
import {QlBackgroundComponent} from './components/ql-background/ql-background.component';
import {QlAttachmentsComponent} from './components/ql-attachments/ql-attachments.component';
import {QlLinkComponent} from './components/ql-link/ql-link.component';
import {QlAlignComponent} from './components/ql-align/ql-align.component';
import {QlFontSizeComponent} from './components/ql-font-size/ql-font-size.component';
import { QlUndoComponent } from './components/ql-undo/ql-undo.component';
import { QlRedoComponent } from './components/ql-redo/ql-redo.component';
import { QlFormatpainterComponent } from './components/ql-formatpainter/ql-formatpainter.component';
import { QlFontComponent } from './components/ql-font/ql-font.component';

@NgModule({
  declarations: [IceEditorComponent, ColorItemListComponent, QlHeaderComponent, QlInsertComponent, QlOrderListComponent, QlBackgroundComponent, QlAttachmentsComponent, QlLinkComponent, QlAlignComponent, QlFontSizeComponent, QlUndoComponent, QlRedoComponent, QlFormatpainterComponent, QlFontComponent],
  imports: [
    BrowserAnimationsModule,
    OverlayModule
  ],
  exports: [IceEditorComponent, ColorItemListComponent, QlHeaderComponent, QlInsertComponent, QlOrderListComponent, QlBackgroundComponent, QlAttachmentsComponent]
})
export class IceEditorModule {
}
