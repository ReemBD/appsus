import { emailService } from '../services/emailService.js'

export class EmailCompose extends React.Component {
    state = {
        emailToSend: {
            subject: '',
            body: ''
        },
        isClosing: false
    }
    elInputRef = React.createRef()

    componentDidMount() {
        this.elInputRef.current.focus()
    }

    onInputChange = (ev) => {
        const emailCopy = { ...this.state.emailToSend }
        emailCopy[ev.target.name] = ev.target.value

        this.setState({
            emailToSend: emailCopy,
        })
    }

    onSendEmail = (ev, email) => {
        ev.preventDefault()
        emailService.addSentEmail(email)
        this.setState({
            emailToSend: {
                subject: '',
                body: ''
            }
        });
    }

    onCloseWin = () => {
        const { closeComposeWin } = this.props;
        this.setState({ isClosing: true });
        setTimeout(closeComposeWin, 1000)
    }

    render() {
        const { emailToSend, isClosing } = this.state;
        return <form className={`compose-email-form flex flex-column ${isClosing && 'hide-modal'}`} onSubmit={(ev) => { this.onSendEmail(ev, emailToSend) }}>
            <button className="close-btn" onClick={this.onCloseWin}>X</button>
            <input value={this.state.emailToSend.subject} ref={this.elInputRef} required
                placeholder="Subject" type="text" name="subject"
                onChange={this.onInputChange} />

            <textarea value={this.state.emailToSend.body}
                rows="15" cols="15"
                placeholder="What would you like to write?" type="text" name="body"
                onChange={this.onInputChange} />

            <button className="send-btn" type="submit">Send</button>
        </form>
    }
}