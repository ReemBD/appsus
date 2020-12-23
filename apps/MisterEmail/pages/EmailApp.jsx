// import { EmailList } from '../../cmps/MisterEmail/EmailList.jsx'
// import { emailService } from '../../services/misterEmail.jsx'

export class EmailApp extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello From Email App</h1>
                <div className="main-container flex">
                    <div className="aside flex flex-column">
                        <button className="compose-btn cursor-pointer">Compose</button>
                        <ul className="categories flex flex-column">
                            <li>Inbox</li>
                            <li>Starred</li>
                            <li>Sent Mail</li>
                            <li>Drafts</li>
                        </ul>
                    </div>
                    {/* <EmailList /> */}
                </div>
            </div>
        )
    }
}
