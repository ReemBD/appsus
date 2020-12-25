import { emailService } from '../services/emailService.js'
import { utilService } from '../../../services/utilService.js'
import { Aside } from '../cmps/Aside.jsx'

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
        return <div className="email-details flex">
            <Aside />
            <div className="main-container flex flex-column">
                <nav className="flex space-between">
                <h1 className="email-subject">{email.subject}</h1>
                <button className="delete-btn" onClick={() => { this.onRemoveEmail(email.id) }}><i class="far fa-trash-alt delete-icon"></i></button>
                </nav>  
                <p>{email.body}</p>
                <h3>{utilService.formatTime(email.sentAt)}</h3>
                
            </div>
        </div>
    }
}