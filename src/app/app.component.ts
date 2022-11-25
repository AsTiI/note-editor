import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NotesState } from './state/notes.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import {
  SetNotes, AddNote
} from './state/notes.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @Select(NotesState.notes) notes$!: Observable<{
    id: string,
    text: string,
    tag: string
  }[]>
  private notesSubscription!: Subscription;
  notes!: { id: string, text: string, tag: string }[];

  title = 'note-editor';
  search = '';
  inputValue = '';
  tags: string[] = [];

  constructor(private http: HttpClient, private storeNotes: Store) {
  }

  ngOnInit(){
    this.setNotes();
    this.notesSubscription = this.notes$.subscribe((notes: {
      id: string,
      text: string,
      tag: string
    }[]) => {
      this.notes = notes;
      this.tags = [];

      this.notes.forEach(note => {
        note.tag.trim().split(' ').forEach(tag => {
          if(tag != '')
            this.tags.push(tag);
        })
      });
      this.tags = Array.from(new Set(this.tags));
    })
  }
  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
  }
  addNote() {
    if(this.inputValue) {
      this.storeNotes.dispatch(new AddNote({
        id: (this.notes.length + 1).toString(),
        text: this.inputValue,
        tag: Array.from(new Set(this.inputValue.trim().split(' ').filter(el => el[0] == '#'))).join(' '),
      }));
      this.inputValue = '';
    }
  }
  setNotes() {
    let dataLocalStorage = localStorage.getItem('notes');
    if(dataLocalStorage)
      this.storeNotes.dispatch(new SetNotes(JSON.parse(dataLocalStorage)))
  }
}
