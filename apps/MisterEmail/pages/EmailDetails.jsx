import { emailService } from '../services/emailService.js'
import { utilService } from '../../../services/utilService.js'


export class EmailDetails extends React.Component {
    state = {
        email: null,
    }

    componentDidMount() {
        const { emailId } = this.props.match.params;
        console.log('emailId: ', emailId);
        emailService.getById(emailId).then(email => {
            this.setState({ email }, () => {
                console.log('email: ', this.state.email);
            })
        })
    }

    onRemoveEmail = (emailId) => {
        console.log('emailId to remove: ', emailId);
        // emailService.remove(emailId)
    }

    render() {
        const { email } = this.state
        if (!email) return <div></div>
        return <div className="email-details">
            <h1 className="email-subject">{email.subject}</h1>
            <p>{email.body}</p>
            <h3>Sent At: {utilService.formatTime(email.sentAt)}</h3>
            <button className="delete-btn" onClick={() => { this.onRemoveEmail(email.id) }}>Delete</button>
        </div>
    }
}