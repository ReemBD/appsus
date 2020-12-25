import { DynamicNoteFunction } from './DynamicNoteFunction.jsx'
export class NotePinnedPreview extends React.Component {


    render() {
        const { note, onDelete, onEdit, onColor, onPin } = this.props
        // console.log('note from dynamic', note);
        return (
            <section className="pinned-notes">

                <div className='note-preview'>
                    <DynamicNoteFunction note={note} onDelete={onDelete} onEdit={onEdit} onColor={onColor} onPin={onPin} />
                </div>
            </section>
        )
    }
}
