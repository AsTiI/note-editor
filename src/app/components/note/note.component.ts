import { Component, OnInit, Input} from '@angular/core';

import { NotesState } from '../../state/notes.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import {
  RemoveNote, EditNote
} from '../../state/notes.actions'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  isEdit = false;
  @Input() note =  { id: '', text: '', tag: '' };
  inputEditNote!: { id: string, text: string, tag: string };
  constructor(private storeNotes: Store) { }

  ngOnInit(): void {
    this.inputEditNote = { id: this.note.id, text: this.note.text, tag: this.note.tag }
  }
  editNote(){
    this.isEdit = !this.isEdit;
  }
  closeModal(){
    this.inputEditNote.text = this.note.text;
    this.editNote();
  }

  dropItem() {
    this.storeNotes.dispatch(new RemoveNote(this.note));
  }
  saveChanges() {
    this.storeNotes.dispatch(new EditNote({
      id: this.inputEditNote.id,
      text: this.inputEditNote.text,
      tag: Array.from(new Set(this.inputEditNote.text.trim().split(' ').filter(el => el[0] == '#'))).join(' ')
    }));
    this.editNote();
  }
}
