import { NotesModel, NoteModel } from './notes.model';

export class SetNotes {
  static readonly type = '[Notes] Set Notes';
  constructor(public payload: NoteModel[]) {
  }
}
export class AddNote {
  static readonly type = '[Note] Add Note';
  constructor(public note: NoteModel) {
  }
}
export class EditNote {
  static readonly type = '[Note] Edit Note';
  constructor(public payload: NoteModel) {
  }
}
export class RemoveNote {
  static readonly type = '[Note] Remove Note';
  constructor(public payload: NoteModel) {
  }
}
