import { NoteActions } from './NoteActions.jsx';
export class NoteTxt extends React.Component {



    render() {
        const { note, onDelete } = this.props
        return (
            <div className='note-container'>
                <div spellCheck="false" className='note note-text'>{note.info.txt}
                    <NoteActions note={note} onDelete={onDelete} />
                </div>

            </div>
        )
    }
}
