export class NoteTxt extends React.Component {
    render() {
        const { note } = this.props
        return (
            <div className='note-container'>
                <textarea spellCheck="false" className='note'>{note.info.txt}</textarea>
            </div>
        )
    }
}
