import { NoteActions } from './NoteActions.jsx';
export class NoteTxt extends React.Component {

    state = {
        txtInfo: {
            txt: ''
        }
    }



    handleChange = (ev) => {
        const callback = () => {
            this.props.onEdit(this.state.txtInfo.txt, this.props.note.id)
        }

        const stateCopy = { ...this.state.txtInfo }
        stateCopy[ev.target.name] = ev.target.value

        this.setState({ txtInfo: stateCopy }, callback)
    }


    render() {
        const { note, onDelete } = this.props
        return (
            <div className='note note-container'>
                <textarea onChange={this.handleChange} spellCheck="false" value={note.info.txt} placeholder="Empty Note" name="txt" className=' note-text'>{note.info.txt}
                </textarea>
                <NoteActions note={note} onDelete={onDelete} />

            </div>
        )
    }
}
