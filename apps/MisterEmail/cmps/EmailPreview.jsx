import { utilService } from '../../../services/utilService.js'
import { emailService } from '../services/emailService.js';
import { StarIcon } from './StarIcon.jsx'

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {

    onOpenEmail = (ev) => {
        ev.stopPropagation();
        const { email, openEmail } = this.props;
        openEmail(email);
    }

    onToggleMarked = (ev) => {
        ev.stopPropagation()
        const { email, toggleMarked } = this.props;
        toggleMarked(email);
    }

    componentDidMount() {

    }

    onToggleFav = (ev) => {
        ev.stopPropagation()
        const { email, toggleFav } = this.props;
        toggleFav(email);
    }

    render() {
        const { email, onRemoveEmail } = this.props
        return <Link to={`/email/${email.id}`}> <div className={`email-preview flex space-around ${email.isRead && 'read'}`} onClick={this.onOpenEmail}>
            <i onClick={(ev) => {
                ev.preventDefault();
                this.onToggleMarked(ev)
                emailService.getMarkedEmailsCount()
            }} className={`far my-check-icon fa-square ${email.isMarked && 'marked'}`}></i>
            <StarIcon onToggleFav={(ev) => {
                ev.preventDefault();
                this.onToggleFav(ev)
            }} isFav={email.isFav} />
            <h1 className="subject">{email.subject}</h1>
            <h3 className="body">{email.body}</h3>
            <h3 className="from">{email.from}</h3>
            <div className="hover-buttons flex space-between">
                <i className="far fa-trash-alt display-none my-delete-icon" onClick={(ev) => { 
                    ev.preventDefault()
                    onRemoveEmail(email.id) }} title="Delete"></i>
                <i className="far fa-envelope display-none my-unread-icon" title="Unread"></i>
            </div>
            <h3 className="sent-at">{utilService.formatHours(new Date(email.sentAt))}</h3>
        </div>
        </Link >
    }
}