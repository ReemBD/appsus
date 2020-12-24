import { NotePreview } from './NotePreview.jsx'


export function NoteList({ notes, onDelete, onEdit }) {

    return (
        <section className="note-list main-layout">
            {notes.map(note => <NotePreview key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} />)}
        </section>
    )
}