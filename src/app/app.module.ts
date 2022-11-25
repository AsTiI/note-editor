import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { NotesState } from './state/notes.state'

import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import { FilterPipe, RemoveTagsPipe, ShowTagsPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    FilterPipe,
    RemoveTagsPipe,
    ShowTagsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxsModule,
    NgxsModule.forRoot([NotesState], {
      developmentMode: !environment.production
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
