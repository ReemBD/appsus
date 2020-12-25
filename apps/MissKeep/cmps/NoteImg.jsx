import { NoteActions } from './NoteActions.jsx'
export class NoteImg extends React.Component {


    render() {
        const { note, onDelete, onColor, onPin } = this.props
        const noteStyle = {
            background: note.style.backgroundColor
        }
        return (
            <section>

                <div className="note-container">
                    <div className="note note-img-container" style={noteStyle}>
                        <img className="note-img" src={note.info.url} />
                        <NoteActions note={note} onDelete={onDelete} onColor={onColor} onPin={onPin} />
                    </div>

                </div>
            </section>
        )
    }
}
