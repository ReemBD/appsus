export function NoteActions(props) {

    function onNoteDelete() {
        const { note, onDelete } = props;
        onDelete(note.id)
    }
    return (
        <div className="note-actions">

            <div className="note-pin-btn">
                <i className="fas fa-thumbtack"></i>
            </div>
            <div className="note-edit-btn"><i className="far fa-edit"></i></div>
            <div className="note-color"><i className="fas fa-palette"></i></div>
            <div onClick={onNoteDelete} className="note-delete-btn"><i className="far fa-trash-alt"></i></div>
        </div>
    )
}
