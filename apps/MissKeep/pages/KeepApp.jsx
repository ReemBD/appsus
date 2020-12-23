import { KeepInput } from '../cmps/KeepInput.jsx'
import { keepService } from '../services/keepService.js'
import { NoteList } from '../cmps/NoteList.jsx'

export class KeepApp extends React.Component {

    state = {
        notes: [],
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        keepService.query()
            .then(notes => this.setState({ notes }))
    }

    get notesForDisplay() {
        return this.state.notes
    }



    onNoteAdd = (note) => {
        console.log('From app', note)
        keepService.saveNote(note)

    }

    render() {
        const notesForDisplay = this.notesForDisplay;
        return (
            <div className='keep-app keep-main-layout'>
                <KeepInput onAdd={this.onNoteAdd} />
                <NoteList notes={notesForDisplay} />
            </div>
        )
    }
}
