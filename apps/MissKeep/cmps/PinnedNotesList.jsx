import { NotePinnedPreview } from './NotePinnedPreview.jsx'


export class PinnedNotesList extends React.Component {
    pinnedHeadingText = () => {
        const ans = this.props.notes.some(note => note.isPinned)
        const txtToDisplay = (ans) ? 'Pinned Notes' : ' '
        return txtToDisplay
    }

    render() {
        const { notes, onDelete, onEdit, onColor, onPin } = this.props

        return (
            <section className="pinned-notes-container main-layout">
                <h3>{this.pinnedHeadingText()}</h3>
                <section className="pinned-note-list flex">
                    {notes.map(note => {
                        if (!note.isPinned) {
                            return
                        } else {
                            return <NotePinnedPreview key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} onColor={onColor} onPin={onPin} />

                        }
                    })}
                </section>
            </section>
        )
    }
}