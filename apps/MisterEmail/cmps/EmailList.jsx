import { EmailPreview } from './EmailPreview.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'

export function EmailList({ emails, openEmail, toggleMarked, toggleFav, onSetFilter }) {
    return (<div className=" email-list-container container flex flex-column">
        <EmailFilter onSetFilter={onSetFilter} />
        <section className="email-list">
            {emails.map(email => {
                return <EmailPreview key={email.id} openEmail={openEmail} toggleFav={toggleFav} toggleMarked={toggleMarked} email={email} />;
            })}
        </section>
    </div>
    )
}