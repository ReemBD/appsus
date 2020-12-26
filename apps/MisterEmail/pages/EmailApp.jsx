import { EmailList } from '../cmps/EmailList.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { Aside } from '../cmps/Aside.jsx'
import { emailService } from '../services/emailService.js'

import { eventBusService } from "../../../services/eventBusService.js";


export class EmailApp extends React.Component {
    state = {
        emails: [],
        filterBy: {
            text: '',
            readStatus: ''
        },
        isComposeOpen: false,
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.href);
        const myParam = urlParams.get('compose')
        if (myParam === 'new') {
            this.composeEmail()
        }
        this.loadEmails();
    }

    loadEmails = () => {
        emailService.query().then(emails => {
            this.setState({ emails });
        })
    }

    openEmail = (email) => {
        emailService.markEmailAsRead(email)
        this.loadEmails();
    }

    get emailsForDisplay() {
        const { filterBy } = this.state;
        const filterRegex = new RegExp(filterBy.text, 'i')
        switch (filterBy.readStatus) {
            case 'read': return this.state.emails.filter(email => email.isRead).filter(email => filterRegex.test(email.subject + email.body))
            case 'unread': return this.state.emails.filter(email => !email.isRead).filter(email => filterRegex.test(email.subject + email.body))
            default: return this.state.emails.filter(email => filterRegex.test(email.subject + email.body + email.from))

        }
    }

    toggleMarked = (email) => {
        emailService.toggleMarked(email);
        this.loadEmails();
    }

    toggleFav = (email) => {
        emailService.toggleFav(email)
        this.loadEmails();
    }




    closeComposeWin = () => {
        this.setState({ isComposeOpen: false })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    composeEmail = () => {
        this.setState({ isComposeOpen: true })
    }

    onRemoveEmail = (emailId) => {

        emailService.remove(emailId)
    }

    doActionAllMarked = ({ target }) => {
        const { emails } = this.state;
        const markedEmails = emails.filter(email => email.isMarked);
        switch (target.dataset.action) {
            case 'readAll': {
                emailService.readAllMarked(markedEmails)
                    .then(emails => this.setState({ emails }))
            }
                break;
            case 'unreadAll': {
                emailService.unreadAllMarked(markedEmails)
                    .then(emails => this.setState({ emails }))
            }
                break;
            case 'removeAll': {
                emailService.removeAllMarked(markedEmails)
                    .then(emails => this.setState({ emails }))
            }
                break;
        }
        emailService.unmarkAll()
            .then(this.loadEmails())

    }

    render() {
        const emailsForDisplay = this.emailsForDisplay
        const { isComposeOpen, emails } = this.state
        return (
            <div className="email-app">
                <div className="email-main-container flex">
                    <Aside onComposeEmail={this.composeEmail} />
                    <EmailList doActionAllMarked={this.doActionAllMarked} onRemoveEmail={this.onRemoveEmail} onSetFilter={this.onSetFilter} toggleMarked={this.toggleMarked} toggleFav={this.toggleFav} openEmail={this.openEmail} emails={emailsForDisplay} />
                    {isComposeOpen && <EmailCompose closeComposeWin={this.closeComposeWin} />}
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}
