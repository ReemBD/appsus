import { NoteActions } from './NoteActions.jsx'
export class NoteTodos extends React.Component {
    state = {
        todos: [],
        todo: { txt: '' },
        isEditable: false,
        currentTodoId: null,
        isDone: false,

    }


    componentDidMount() {
        const todos = this.props.note.info.todos
        this.setState({ todos })
    }

    onTodoClick = (todoId) => {
        this.setState({ isEditable: true, currentTodoId: todoId })
        console.log(todoId);

    }

    onCheckboxClick = (todoId, ev) => {
        ev.stopPropagation()
        console.log(todoId);
        const todoToUpdateIdx = this.state.todos.findIndex(todo => todo.id === todoId)
        const todosCopy = [...this.state.todos]
        if (todosCopy[todoToUpdateIdx].doneAt) todosCopy[todoToUpdateIdx].doneAt = null
        else todosCopy[todoToUpdateIdx].doneAt = Date.now();
        this.setState({ todos: todosCopy }, () => {
            this.props.onTodoChange(this.state.todos, this.props.note.id)
        });
    }

    handleChange = (ev) => {
        const txt = (ev.target.value);
        this.saveEdit(txt, this.state.currentTodoId)
    }

    saveEdit = (txt, currentTodoId) => {
        const todoToUpdateIdx = this.state.todos.findIndex(todo => todo.id === currentTodoId)
        console.log(todoToUpdateIdx);
        const todosCopy = [...this.state.todos]
        todosCopy[todoToUpdateIdx].txt = txt
        this.setState({ todos: todosCopy }, () => {
            this.props.onTodoChange(this.state.todos, this.props.note.id)
        })

    }


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
                            return <li
                                onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
                                <div className="todo-container flex">

                                    <textarea style={todo.doneAt ? { textDecoration: 'line-through' } : {}} rows="1"
                                        onChange={this.handleChange}
                                        spellCheck="false"
                                        name="txt"
                                        defaultValue={todo.txt.trim()}
                                    >
                                    </textarea>
                                    <i style={todo.doneAt ? { color: 'green' } : {}} onClick={(e) => this.onCheckboxClick(todo.id, e)} className="far fa-check-square"></i>
                                </div>
                            </li>
                        })}
                    </div>
                    <NoteActions note={note} onDelete={onDelete} onColor={onColor} onPin={onPin} />
                </ul>
            </div>
        )
    }
}
