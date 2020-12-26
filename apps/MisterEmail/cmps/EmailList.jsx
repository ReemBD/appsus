import { EmailPreview } from './EmailPreview.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { MarkedEmails } from '../cmps/MarkedEmails.jsx'

export function EmailList({ emails, openEmail, toggleMarked, toggleFav, onSetFilter, doActionAllMarked, onRemoveEmail }) {
    return (<div className=" email-list-container  flex flex-column">
        <div className="filter-bar flex space-between">
            <EmailFilter onSetFilter={onSetFilter} />
            <MarkedEmails doActionAllMarked={doActionAllMarked} />
        </div>
        <section className="email-list">
            {emails.map(email => {
                return <EmailPreview key={email.id} onRemoveEmail={onRemoveEmail} openEmail={openEmail} toggleFav={toggleFav} toggleMarked={toggleMarked} email={email} />;
            })}
        </section>
    </div>
    )
}