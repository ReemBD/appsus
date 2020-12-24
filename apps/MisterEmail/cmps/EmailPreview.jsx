import { emailService } from '../services/emailService.js'
import { utilService } from '../../../services/utilService.js'
import { StarIcon } from './StarIcon.jsx'

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {

    onOpenEmail = (ev) => {
        ev.stopPropagation();
        console.log('hello');
        const { email, openEmail } = this.props;
        openEmail(email);
    }

    onToggleMarked = (ev) => {
        ev.stopPropagation()
        console.log('hello');
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
        const { email } = this.props
        return <Link to={`email/${email.id}`}> <div className={`email-preview flex space-around ${email.isRead && 'read'}`} onClick={this.onOpenEmail}>
            <button className={`isMarked-btn ${email.isMarked && 'marked'}`} onClick={(ev) => {
                ev.preventDefault();
                this.onToggleMarked(ev)
            }}>✔️</button>
            <button className="markAsFav-btn" onClick={(ev) => {
                ev.preventDefault();
                this.onToggleFav(ev)
            }}><StarIcon isFav={email.isFav} /></button>
            <h1 className="subject">{email.subject}</h1>
            <h3 className="body">{email.body.substring(0, 20)}...</h3>
            <h3 className="from">{email.from.substring(0, 20)}</h3>
            <h3 className="sent-at">{utilService.formatHours(new Date(email.sentAt))}</h3>
        </div>
        </Link >
    }
}