import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from './NoteVideo.jsx'
export class NotePreview extends React.Component {

    dynamicNoteFunction = () => {
        const { note, onDelete } = this.props
        switch (note.type) {
            case 'NoteText':
                return <NoteTxt note={note} onDelete={onDelete} />
            case 'NoteImg':
                return <NoteImg note={note} onDelete={onDelete} />
            case 'NoteTodos':
                return <NoteTodos note={note} onDelete={onDelete} />
            case 'NoteVideo':
                return <NoteVideo note={note} onDelete={onDelete} />
        }
    }


    render() {

        // console.log('note from dynamic', note);
        return (
            <span className='notes-preview'>
                {this.dynamicNoteFunction()}
            </span>
        )
    }
}
