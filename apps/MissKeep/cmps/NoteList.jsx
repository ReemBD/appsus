import { NotePreview } from './NotePreview.jsx'


export function NoteList({ notes, onDelete, onEdit, onColor, onPin }) {

    return (
        <section className=" main-layout">
            <section className="note-list">
                {notes.map(note => {
                    if (!note.isPinned) {
                        return <NotePreview key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} onColor={onColor} onPin={onPin} />
                    } else {
                        return
                    }
                })}
            </section>
        </section>
    )
}