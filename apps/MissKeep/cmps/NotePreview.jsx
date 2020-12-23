import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
export class NotePreview extends React.Component {

    dynamicNoteFunction = () => {
        const { note } = this.props
        switch (note.type) {
            case 'NoteText':
                return <NoteTxt note={note} />
            case 'NoteImg':
                return <NoteImg note={note} />
            case 'NoteTodos':
                return <NoteTodos note={note} />
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
