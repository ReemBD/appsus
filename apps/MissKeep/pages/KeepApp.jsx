import { KeepInput } from '../cmps/KeepInput.jsx'
import { keepService } from '../services/keepService.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { PinnedNotesList } from '../cmps/PinnedNotesList.jsx'
import { utilService } from '../../../services/utilService.js'

export class KeepApp extends React.Component {

    state = {
        notes: [],
        pinnedNotes: []
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
        keepService.saveNote(note)
        this.loadNotes()
        // .then(notes => {
        //     const copyNotes = [...this.state.notes]
        //     copyNotes = notes
        //     this.setState({ notes: copyNotes })

        // })
    }

    onNoteDelete = (noteId) => {
        keepService.deleteNote(noteId)
            .then(this.loadNotes)

    }

    onNoteEdit = (newTxt, note) => {
        keepService.updateNote(note, newTxt)
            .then(this.loadNotes())
    }

    onNoteColorChange = (color, noteId) => {
        keepService.changeColor(color, noteId)
            .then(this.loadNotes())
            .then(console.log(this.state.notes))
    }

    onNotePin = (noteId) => {
        keepService.pinNote(noteId)
            .then(this.loadNotes())
    }

    render() {
        const notesForDisplay = this.notesForDisplay;
        return (
            <div className='keep-app keep-main-layout'>
                <KeepInput onAdd={this.onNoteAdd} />
                <PinnedNotesList notes={notesForDisplay} onDelete={this.onNoteDelete} onEdit={this.onNoteEdit} onColor={this.onNoteColorChange} onPin={this.onNotePin} />
                <NoteList notes={notesForDisplay} onDelete={this.onNoteDelete} onEdit={this.onNoteEdit} onColor={this.onNoteColorChange} onPin={this.onNotePin} />
            </div>
        )
    }
}
