export function NoteActions(props) {

    function onNoteDelete() {
        const { note, onDelete } = props;
        onDelete(note.id)
    }
    return (
        <div className="note-actions">

            <div onClick={onNoteDelete} className="note-delete-btn"><i className="far fa-trash-alt"></i></div>
            <div className="note-pin-btn">
                <i className="fas fa-thumbtack"></i>
            </div>
            <div className="note-color"><i class="fas fa-palette"></i></div>
        </div>
    )
}
