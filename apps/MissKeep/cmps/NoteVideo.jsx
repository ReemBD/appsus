import { NoteActions } from './NoteActions.jsx'
export class NoteVideo extends React.Component {
    render() {
        const { note, onDelete, onPin } = this.props
        return (
            <section>

                <div className="note-container">
                    <div className="note note-video">

                        <iframe width="400" height="250"
                            src={note.info.url}>
                        </iframe>
                        <NoteActions note={note} onDelete={onDelete} onPin={onPin} />
                    </div>
                </div>
            </section>
        )
    }
}
