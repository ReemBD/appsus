export class NoteImg extends React.Component {
    render() {
        const { note } = this.props
        return (
            <section>

                <div className="note-container">
                    <img className="note note-img" src={note.info.url} />
                </div>
            </section>
        )
    }
}
