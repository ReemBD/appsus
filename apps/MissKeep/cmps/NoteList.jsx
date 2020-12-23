import { NotePreview } from './NotePreview.jsx'


export function NoteList({ notes, onDelete }) {

    return (
        <section className="note-list main-layout">
            {notes.map(note => <NotePreview key={note.id} note={note} onDelete={onDelete} />)}
        </section>
    )
}