export class NoteActions extends React.Component {

    state = {
        color: {
            isPaletteOpen: false,
            color: ''
        }
    }

    onNoteDelete = () => {
        const { note, onDelete } = this.props;
        onDelete(note.id)
    }

    onPaletteClick = () => {
        const stateCopy = { ...this.state.color }
        stateCopy.isPaletteOpen = true
        this.setState({ color: stateCopy })
    }

    onColorChange = (color) => {
        const stateCopy = { ...this.state.color }
        const { onColor, note } = this.props
        stateCopy.isPaletteOpen = false
        stateCopy.color = color
        this.setState({ color: stateCopy }, () => {
            onColor(color, note.id)
        })
    }

    onColors = () => {
        return <div className="color-palette flex">
            <div onClick={() => this.onColorChange('purple')} className="color-circle purple"></div>
            <div onClick={() => this.onColorChange('green')} className="color-circle green"></div>
            <div onClick={() => this.onColorChange('yellow')} className="color-circle yellow"></div>
            <div onClick={() => this.onColorChange('blue')} className="color-circle blue"></div>
            <div onClick={() => this.onColorChange('red')} className="color-circle red"></div>
        </div>
    }


    render() {

        return (
            <div className="actions-container">
                <section className="note-actions">

                    <div title="Pin note" className="note-pin-btn">
                        <i className="fas fa-thumbtack"></i>
                    </div>
                    {/* <div className="note-edit-btn"><i className="far fa-edit"></i></div> */}
                    <div title="Send as mail" className="note-mail-btn"><i className="far fa-paper-plane"></i></div>
                    <div title="Change note color" onClick={this.onPaletteClick} className="note-color"><i className="fas fa-palette"></i></div>
                    <div title="Delete note" onClick={this.onNoteDelete} className="note-delete-btn"><i className="far fa-trash-alt"></i></div>
                </section>
                {this.state.color.isPaletteOpen && this.onColors()}
            </div>
        )
    }
}
