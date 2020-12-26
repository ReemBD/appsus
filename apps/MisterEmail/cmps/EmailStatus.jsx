import { emailService } from '../services/emailService.js'


export function EmailStatus({ email, emailsLen }) {
    const emailsReadCount = emailService.getReadEmailsCount();
    const emailsUnreadCount = emailService.getUnReadEmailsCount();
    const emailsCount = emailsReadCount + emailsUnreadCount;
    return <progress className="unread-counter" value={emailsReadCount} max={emailsCount}></progress>
}