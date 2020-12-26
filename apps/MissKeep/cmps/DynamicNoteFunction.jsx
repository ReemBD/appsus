import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from './NoteVideo.jsx'

export function DynamicNoteFunction(props) {
    const { note, onDelete, onEdit, onColor, onPin, onTodoChange } = props
    switch (note.type) {
        case 'NoteText':
            return <NoteTxt note={note} onDelete={onDelete} onEdit={onEdit} onColor={onColor} onPin={onPin} />
        case 'NoteImg':
            return <NoteImg note={note} onDelete={onDelete} onColor={onColor} onPin={onPin} />
        case 'NoteTodos':
            return <NoteTodos note={note} onDelete={onDelete} onColor={onColor} onPin={onPin} onTodoChange={onTodoChange} />
        case 'NoteVideo':
            return <NoteVideo note={note} onDelete={onDelete} onColor={onColor} onPin={onPin} />
    }

    return (

        <div>

        </div>
    )
}
