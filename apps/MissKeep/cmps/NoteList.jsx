import { NotePreview } from './NotePreview.jsx'


export function NoteList({ notes, onDelete, onEdit, onColor, onPin, onTodoChange }) {

    return (
        <section className=" main-layout">
            <section className="note-list">
                {notes.map(note => {
                    if (!note.isPinned) {
                        return <NotePreview key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} onColor={onColor} onPin={onPin} onTodoChange={onTodoChange} />
                    } else {
                        return
                    }
                })}
            </section>
        </section>
    )
}