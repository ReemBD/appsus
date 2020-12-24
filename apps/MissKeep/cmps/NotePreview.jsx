import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from './NoteVideo.jsx'
export class NotePreview extends React.Component {



    dynamicNoteFunction = () => {
        const { note, onDelete, onEdit, onColor } = this.props

        switch (note.type) {
            case 'NoteText':
                return <NoteTxt note={note} onDelete={onDelete} onEdit={onEdit} onColor={onColor} />
            case 'NoteImg':
                return <NoteImg note={note} onDelete={onDelete} onColor={onColor} />
            case 'NoteTodos':
                return <NoteTodos note={note} onDelete={onDelete} onColor={onColor} />
            case 'NoteVideo':
                return <NoteVideo note={note} onDelete={onDelete} onColor={onColor} />
        }
    }


    render() {

        // console.log('note from dynamic', note);
        return (
            <div className='note-preview'>
                {this.dynamicNoteFunction()}
            </div>
        )
    }
}
