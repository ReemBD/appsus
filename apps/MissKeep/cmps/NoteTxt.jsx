import { NoteActions } from './NoteActions.jsx';
export class NoteTxt extends React.Component {



    render() {
        const { note, onDelete } = this.props
        return (
            <div className='note note-container'>
                <textarea spellCheck="false" className=' note-text'>{note.info.txt}
                </textarea>
                <NoteActions note={note} onDelete={onDelete} />

            </div>
        )
    }
}
