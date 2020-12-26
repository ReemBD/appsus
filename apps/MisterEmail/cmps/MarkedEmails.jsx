import { emailService } from '../services/emailService.js'

export class MarkedEmails extends React.Component {

    state = {
        isDropDownOpen: false
    }

    toggleDropDown = () => {
        const { isDropDownOpen } = this.state
        this.setState({ isDropDownOpen: !isDropDownOpen })
    }

    render() {
        const { isDropDownOpen } = this.state
        const { doActionAllMarked } = this.props
        return <div className="marked-emails flex">
            <i onClick={this.toggleDropDown} title="Marked Emails" className="far fa-check-square my-marked-icon cursor-pointer"></i>
            <span title="Marked Emails" className="marked-count">{`(${emailService.getMarkedEmailsCount()})`}</span>
            <ul className={`actions-dropdown ${!isDropDownOpen && 'display-none'}`}>
                <li data-value="all" data-action="readAll" onClick={doActionAllMarked} >Read All</li>
                <li data-value="read" data-action="unreadAll" onClick={doActionAllMarked} >Unread All </li>
                <li data-value="unread" data-action="removeAll" onClick={doActionAllMarked} >Delete All </li>
            </ul>
        </div >
    }

}