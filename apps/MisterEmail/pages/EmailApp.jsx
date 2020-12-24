import { EmailList } from '../cmps/EmailList.jsx'
import { EmailStatus } from '../cmps/EmailStatus.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'

import { emailService } from '../services/emailService.js'



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
            this.setState({ emails }, () => console.log(this.state.emails));
        })
    }

    openEmail = (email) => {
        emailService.markEmailAsRead(email)
        this.loadEmails();
    }

    get emailsForDisplay() {
        // return this.state.emails;
        const { filterBy } = this.state;
        console.log('filterBy: ', filterBy);
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
        this.setState({ filterBy }, () => console.log('(from emailApp) this.state.filterBy: ', this.state.filterBy))
    }

    render() {
        const emailsForDisplay = this.emailsForDisplay
        const { isComposeOpen } = this.state
        return (
            <div className="email-app">
                <EmailFilter onSetFilter={this.onSetFilter} />
                <div className="email-main-container flex">
                    <div className="aside flex flex-column">
                        <button className="compose-btn cursor-pointer" onClick={() => { this.setState({ isComposeOpen: true }) }}>Compose</button>
                        <ul className="categories flex flex-column">
                            <li className="cursor-pointer"><a href="#">Inbox</a></li>
                            <li className="cursor-pointer"><a href="#">Starred</a> </li>
                            <li className="cursor-pointer"><a href="#">Sent Mail</a></li>
                            <li className="cursor-pointer"><a href="#">Drafts</a></li>
                        </ul>
                        <EmailStatus />
                    </div>
                    <EmailList toggleMarked={this.toggleMarked} toggleFav={this.toggleFav} openEmail={this.openEmail} emails={emailsForDisplay} />
                    {isComposeOpen && <EmailCompose closeComposeWin={this.closeComposeWin} />}

                    <div>
                    </div>
                </div>
            </div>
        )
    }
}
