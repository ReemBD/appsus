import { NoteActions } from './NoteActions.jsx'
export class NoteTodos extends React.Component {
    render() {
        const { note, onDelete } = this.props
        return (
            <div className='note-container'>
                <ul className="note note-todos">
                    <div className="todos-container">

                        {note.info.todos.map(todo => {
                            return <li key={todo.id}>{todo.txt.trim()}</li>
                        })}
                    </div>
                    <NoteActions note={note} onDelete={onDelete} />
                </ul>
            </div>
        )
    }
}
