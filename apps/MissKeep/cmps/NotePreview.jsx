import { DynamicNoteFunction } from './DynamicNoteFunction.jsx'
export class NotePreview extends React.Component {


    render() {
        const { note, onDelete, onEdit, onColor, onPin, onTodoChange } = this.props
        return (
            <div className='note-preview'>
                <DynamicNoteFunction note={note} onDelete={onDelete} onEdit={onEdit} onColor={onColor} onPin={onPin} onTodoChange={onTodoChange} />
            </div>
        )
    }
}
