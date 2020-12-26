import { emailService } from '../services/emailService.js'


export function EmailStatus({ email, emailsLen }) {
    const emailsReadCount = emailService.getReadEmailsCount();
    const emailsUnreadCount = emailService.getUnReadEmailsCount();
    const emailsCount = emailsReadCount + emailsUnreadCount;
    return <progress value={emailsReadCount} max={emailsCount}></progress>
}