import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IceEditorModule} from '../../projects/ice-editor/src/lib/ice-editor.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IceEditorModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
