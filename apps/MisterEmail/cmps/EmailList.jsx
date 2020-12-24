import { EmailPreview } from './EmailPreview.jsx'

export function EmailList({ emails, openEmail, toggleMarked, toggleFav }) {
    return (
        <section className="email-list">
            {emails.map(email => {
                return <EmailPreview key={email.id} openEmail={openEmail} toggleFav={toggleFav} toggleMarked={toggleMarked} email={email} />;
            })}
        </section>
    )
}