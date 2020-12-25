import { DynamicNoteFunction } from './DynamicNoteFunction.jsx'
export class NotePreview extends React.Component {


    render() {
        const { note, onDelete, onEdit, onColor, onPin } = this.props
        return (
            <div className='note-preview'>
                <DynamicNoteFunction note={note} onDelete={onDelete} onEdit={onEdit} onColor={onColor} onPin={onPin} />
            </div>
        )
    }
}
