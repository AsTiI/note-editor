export interface NotesModel {
  notes: NoteModel[]
}
export interface NoteModel {
  id: string,
  text: string,
  tag: string,
}
