import { NoteActions } from './NoteActions.jsx'
export class NoteTodos extends React.Component {
    render() {
        const { note, onDelete, onColor, onPin } = this.props
        const noteStyle = {
            background: note.style.backgroundColor
        }
        return (
            <div className='note-container' >
                <ul className="note note-todos" style={noteStyle}>
                    <div className="todos-container">

                        {note.info.todos.map(todo => {
                            return <li key={todo.id}>{todo.txt.trim()}</li>
                        })}
                    </div>
                    <NoteActions note={note} onDelete={onDelete} onColor={onColor} onPin={onPin} />
                </ul>
            </div>
        )
    }
}
