import { emailService } from '../services/emailService.js'
import { sentEmailService } from '../services/sentEmails.js'
import { EmailStatus } from '../cmps/EmailStatus.jsx'

export class Aside extends React.Component {
    state = {
        isDropdown: false
    }

    onOpenMenu = () => {
        this.setState({ isDropdown: !this.state.isDropdown })
    }

    render() {
        const { onComposeEmail } = this.props
        const { isDropdown } = this.state
        return <div><div className={`aside  flex flex-column ${isDropdown && 'active'}`}>
            <button className="compose-btn cursor-pointer" onClick={onComposeEmail}><i className="far fa-edit"></i> Compose</button>
            <ul className="categories flex flex-column">
                <li className="cursor-pointer"><a href="#">Inbox</a></li>
                <li className="cursor-pointer"><a href="#">Starred {`(${emailService.getFavEmailsCount()})`}</a> </li>
                <li className="cursor-pointer"><a href="#">Sent Mail {`(${sentEmailService.getSentEmailsCount()})`}</a></li>
                <li className="cursor-pointer"><a href="#">Drafts</a></li>
            </ul>
            <EmailStatus />
        </div>
            <button className="dropdown-categories-btn display-none" onClick={this.onOpenMenu}>☰</button>
        </div >
    }
}