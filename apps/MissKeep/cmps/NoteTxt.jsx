export class NoteTxt extends React.Component {

    onNoteDelete = () => {
        const { note, onDelete } = this.props;
        onDelete(note.id)
    }

    render() {
        const { note } = this.props
        return (
            <div className='note-container'>
                <textarea spellCheck="false" className='note note-text'>{note.info.txt}</textarea>
                <button onClick={this.onNoteDelete}>delete</button>
            </div>
        )
    }
}
