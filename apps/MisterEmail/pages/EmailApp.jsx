import { EmailList } from '../cmps/EmailList.jsx'
import { EmailStatus } from '../cmps/EmailStatus.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'

import { emailService } from '../services/emailService.js'

export class EmailApp extends React.Component {
    state = {
        emails: [],
        filterBy: {
            text: ''
        },
        isComposeOpen: false,
    }

    loadEmails = () => {
        emailService.query().then(emails => {
            this.setState({ emails }, () => console.log(this.state.emails));
        })
    }

    get emailsForDisplay() {
        const { filterBy } = this.state;
        console.log('filterBy: ', filterBy);
        const filterRegex = new RegExp(filterBy.text, 'i')
        return this.state.emails.filter(email => filterRegex.test(email.subject + email.body))
    }

    componentDidMount() {
        this.loadEmails();
    }

    closeComposeWin = () => {
        this.setState({ isComposeOpen: false })
    }

    onSetFilter = (type, filterBy) => {
        this.setState({ filterBy }, () => console.log('this.state.filterBy: ', this.state.filterBy))
    }

    render() {
        const emailsForDisplay = this.emailsForDisplay
        const { isComposeOpen } = this.state
        return (
            <div className="email-app">
                <EmailFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                <div className="email-main-container flex">
                    <div className="aside flex flex-column">
                        <button className="compose-btn cursor-pointer" onClick={() => { this.setState({ isComposeOpen: true }) }}>Compose</button>
                        <ul className="categories flex flex-column">
                            <li>Inbox</li>
                            <li>Starred</li>
                            <li>Sent Mail</li>
                            <li>Drafts</li>
                        </ul>
                        <EmailStatus />
                    </div>
                    <EmailList emails={emailsForDisplay} />
                    {isComposeOpen && <EmailCompose closeComposeWin={this.closeComposeWin} />}

                    <div>
                    </div>
                </div>
            </div>
        )
    }
}
