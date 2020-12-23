import { emailService } from '../services/emailService.js'
import { utilService } from '../../../services/utilService.js'

const { Link } = ReactRouterDOM

export function EmailPreview({ email }) {
    return <Link to={`email/${email.id}`}><div className="email-preview flex space-around" onClick={() => {
        emailService.markEmailAsRead(email)
    }}>
        <h1 className="email-preview-subject">{email.subject}</h1>
        <h3 className="email-preview-body">{email.body.substring(0, 20)}...</h3>
        <h3>{utilService.formatTime(email.sentAt)}</h3>
    </div>
    </Link>
}