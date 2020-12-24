import { emailService } from '../services/emailService.js'


export function EmailStatus({ email }) {
    const emailsUnreadCount = emailService.getUnReadEmailsCount();
    return <div className="email-status"><h1>Emails Unread: {emailsUnreadCount}</h1></div>
}