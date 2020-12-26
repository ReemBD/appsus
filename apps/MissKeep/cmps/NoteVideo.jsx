import { NoteActions } from './NoteActions.jsx'
export class NoteVideo extends React.Component {
    render() {
        const { note, onDelete, onColor, onPin } = this.props
        const noteStyle = {
            background: note.style.backgroundColor
        }
        return (
            <section>

                <div className="note-container">
                    <div className="note note-video" style={noteStyle}>

                        <iframe width="400" height="250"
                            src={note.info.url}>
                        </iframe>
                        <NoteActions note={note} onDelete={onDelete} onColor={onColor} onPin={onPin} />
                    </div>
                </div>
            </section>
        )
    }
}
