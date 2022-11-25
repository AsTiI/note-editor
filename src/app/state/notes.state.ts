import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { NotesModel, NoteModel } from './notes.model'
import { SetNotes, AddNote, EditNote, RemoveNote } from './notes.actions';
import { Selector } from '@ngxs/store';

@State<NotesModel>({
  name: 'notes',
  defaults: {
    notes: [{
      id: '0',
      text: 'adsad',
      tag: 'asd'
    }]
  }
})

@Injectable()
export class NotesState {
  updateLocalStorage(data: NoteModel[]){
    localStorage.setItem('notes', JSON.stringify(data))
  }
  @Action(SetNotes)
  setNotes(ctx: StateContext<NotesModel>, action: SetNotes) {
    ctx.setState((state) => ({
      notes: action.payload
    }))
  }
  @Action(AddNote)
  addNote(ctx: StateContext<NotesModel>, action: AddNote) {
    ctx.setState((state) => ({
      notes: [...state.notes, action.note]
    }))
    this.updateLocalStorage(ctx.getState().notes)
  }
  @Action(EditNote)
  editNote(ctx: StateContext<NotesModel>, action: EditNote) {
    const state = ctx.getState().notes
      .map(note => note.id == action.payload.id ? action.payload : note);
    ctx.setState({
      notes: [...state]
    })
    this.updateLocalStorage(ctx.getState().notes)
  }

  @Action(RemoveNote)
  removeNote(ctx: StateContext<NotesModel>, action: RemoveNote) {
    let id = 0;
    const notes = ctx.getState().notes
      .filter(el => el != action.payload)
      .map(el => {
        return {
          id: (++id).toString(),
          text: el.text,
          tag: el.tag
        }
      })
    ctx.setState({
      notes: [...notes]
    })
    this.updateLocalStorage(ctx.getState().notes)
  }
  @Selector()
  static notes(state: NotesModel) {
    return state.notes
  }
}
