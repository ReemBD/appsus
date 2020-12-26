import { sentEmailService } from '../services/sentEmails.js'

export class EmailCompose extends React.Component {
    state = {
        emailToSend: {
            to: '',
            copy: '',
            subject: '',
            body: ''
        },
        isClosing: false
    }
    elInputRef = React.createRef()

    componentDidMount() {
        this.elInputRef.current.focus()
        const urlParams = new URLSearchParams(window.location.href);
        const myParam = urlParams.get('compose')
        if (myParam === 'new') {
            const emailCopy = { ...this.state.email }
            emailCopy.subject = urlParams.get('subject')
            emailCopy.body = urlParams.get('body')
            this.setState({ emailToSend: emailCopy })
        }
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
        sentEmailService.addSentEmail(email)
        this.setState({
            emailToSend: {
                to: '',
                copy: '',
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
            <nav className="nav flex space-between">
                <h1 className="title">New Message</h1>
                <button className="close-btn" onClick={this.onCloseWin}><i className="fas fa-times"></i></button>
            </nav>
            <input className="field" type="email" name="to" id="" placeholder="To:" ref={this.elInputRef} />
            <input className="field" type="text" name="copy" placeholder="Cc:" />
            <input className="field" value={this.state.emailToSend.subject} required
                placeholder="Subject:" type="text" name="subject"
                onChange={this.onInputChange} />

            <textarea value={this.state.emailToSend.body}
                rows="15" cols="15" className="field"
                placeholder="What would you like to write?" type="text" name="body"
                onChange={this.onInputChange} />

            <button className="send-btn" type="submit">Send</button>
        </form>
    }
}