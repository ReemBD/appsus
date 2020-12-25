import { EmailList } from '../cmps/EmailList.jsx'
import { EmailStatus } from '../cmps/EmailStatus.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { Aside } from '../cmps/Aside.jsx'
import { emailService } from '../services/emailService.js'
import { sentEmailService } from '../services/sentEmails.js'



export class EmailApp extends React.Component {
    state = {
        emails: [],
        filterBy: {
            text: '',
            readStatus: ''
        },
        isComposeOpen: false,
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
            default: return this.state.emails.filter(email => filterRegex.test(email.subject + email.body))

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

    componentDidMount() {
        this.loadEmails();
    }

    closeComposeWin = () => {
        this.setState({ isComposeOpen: false })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    composeEmail = () => {
        const { isComposeOpen } = this.state
        this.setState({ isComposeOpen: true })
    }

    render() {
        const emailsForDisplay = this.emailsForDisplay
        const { isComposeOpen } = this.state
        return (
            <div className="email-app">
                <div className="email-main-container flex">
                    <Aside onComposeEmail={this.composeEmail} />
                    <EmailList onSetFilter={this.onSetFilter} toggleMarked={this.toggleMarked} toggleFav={this.toggleFav} openEmail={this.openEmail} emails={emailsForDisplay} />
                    {isComposeOpen && <EmailCompose closeComposeWin={this.closeComposeWin} />}
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}
