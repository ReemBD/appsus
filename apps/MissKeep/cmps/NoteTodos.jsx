export class NoteTodos extends React.Component {
    render() {
        const { note } = this.props
        return (
            <div className='note-container'>
                <ul className="note">
                    {note.info.todos.map(todo => {
                        return <li>{todo.txt}</li>
                    })}
                </ul>
            </div>
        )
    }
}
