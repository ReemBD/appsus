
export class KeepInput extends React.Component {
    state = {
        inputInfo: {
            type: 'text',
            placeholder: 'Write a keep',
            noteType: 'NoteText',
            keepTxt: '',

        }
    }

    refInput = React.createRef()

    componentDidMount() {
        this.refInput.current.focus()
    }


    onKeepTypeSelect = (selectedType) => { // Change input type and placeholder on user click
        if (selectedType === 'NoteText') this.updateState('text', 'Write a keep', selectedType)
        else if (selectedType === 'NoteImg') this.updateState('text', 'Paste Image Link', selectedType)
        else if (selectedType === 'NoteTodos') this.updateState('text', 'Write todos seperated by comma', selectedType)
        else if (selectedType === 'NoteVideo') this.updateState('text', 'Paste Youtube Link', selectedType)
        this.refInput.current.focus()
    }

    updateState = (type, placeholder, noteType) => {
        const userSelection = { type, placeholder, noteType };
        this.setState({
            inputInfo: userSelection
        })
    }

    onAddInput = (ev) => {
        ev.preventDefault()
        const { keepTxt } = this.state.inputInfo
        if (!keepTxt) {
            console.log('Cant add empty keep') // Change to even bus message
            return
        }
        this.props.onAdd(this.state.inputInfo)
        const defaultState = { ...this.state.inputInfo }
        defaultState.keepTxt = ''
        this.setState({ inputInfo: defaultState })
    }

    handleChange = (ev) => {

        const value = ev.target.value;

        const inputCopy = { ...this.state.inputInfo }
        inputCopy[ev.target.name] = value;

        this.setState({
            inputInfo: inputCopy
        })
    }


    render() {
        const { type, placeholder, keepTxt } = this.state.inputInfo;
        return (
            <div className="keep-input-container">
                <div className="keep-input">
                    <form onSubmit={this.onAddInput}>
                        <input type={type} placeholder={placeholder} name="keepTxt" value={keepTxt} onChange={this.handleChange} ref={this.refInput} />
                    </form>
                </div>

                <div className="keep-input-buttons">
                    <p onClick={() => this.onKeepTypeSelect('NoteText')}><i className="fas fa-font "></i></p>

                    <p onClick={() => this.onKeepTypeSelect('NoteImg')} ><i className="far fa-image "></i></p>

                    <p onClick={() => this.onKeepTypeSelect('NoteTodos')}><i className="fas fa-list-ul "></i></p>

                    <p onClick={() => this.onKeepTypeSelect('NoteVideo')}><i className="fab fa-youtube"></i></p>
                </div>
            </div>
        )
    }
}
