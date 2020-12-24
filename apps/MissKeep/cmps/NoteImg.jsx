import { NoteActions } from './NoteActions.jsx'
export class NoteImg extends React.Component {
    render() {
        const { note, onDelete } = this.props
        return (
            <section>

                <div className="note-container">
                    <div className="note note-img-container">
                        <img className="note-img" src={note.info.url} />
                        <NoteActions note={note} onDelete={onDelete} />
                    </div>

                </div>
            </section>
        )
    }
}
