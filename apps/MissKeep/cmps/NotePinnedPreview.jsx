import { DynamicNoteFunction } from './DynamicNoteFunction.jsx'
export class NotePinnedPreview extends React.Component {


    render() {
        const { note, onDelete, onEdit, onColor, onPin, onTodoChange } = this.props
        return (
            <section className="pinned-notes">

                <div className='note-preview'>
                    <DynamicNoteFunction note={note} onDelete={onDelete} onEdit={onEdit} onColor={onColor} onPin={onPin} onTodoChange={onTodoChange} />
                </div>
            </section>
        )
    }
}
