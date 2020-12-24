import { emailService } from '../services/emailService.js'


export function EmailStatus({ email }) {
    const emailsReadCount = emailService.getReadEmailsCount();
    return <div className="email-status"><h1>Emails Read: {emailsReadCount}</h1></div>
}