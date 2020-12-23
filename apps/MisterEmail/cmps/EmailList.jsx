import {EmailPreview} from './EmailPreview.jsx'

export function EmailList({ emails, onRemoveEmail, onAddEmail }) {
    return (
        <section className="email-list">
            {emails.map(email => {
                return <EmailPreview key={email.id} email={email} />;
            })}
        </section>
    )
}