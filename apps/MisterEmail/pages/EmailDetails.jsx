import { emailService } from '../services/emailService.js'
import { utilService } from '../../../services/utilService.js'
import { Aside } from '../cmps/Aside.jsx'
import { eventBusService } from "../../../services/eventBusService.js"
import { EmailCompose } from '../cmps/EmailCompose.jsx'

export class EmailDetails extends React.Component {
    state = {
        email: null,
        isComposeOpen: false,
        isReply: false,
        reply: {
            txt: '',
            sentAt: ''
        }
    }

    replyRef = React.createRef()

    composeEmail = () => {
        this.setState({ isComposeOpen: true })
    }

    componentDidMount() {
        this.loadEmail()

    }
    closeComposeWin = () => {
        this.setState({ isComposeOpen: false })
    }


    onRemoveEmail = (emailId) => {
        emailService.remove(emailId)
    }

    onGoBack = () => { this.props.history.push('/email') }

    onReply = () => {
        this.setState({ isReply: true })
    }

    onSendReply = () => {
        const { email, reply } = this.state
        let replyCopy = { ...reply }
        replyCopy.sentAt = Date.now()
        emailService.addReply(email, replyCopy)
            .then(() => {
                this.loadEmail()
                replyCopy = { ...replyCopy }
                replyCopy.txt = ''
                this.setState({ reply: replyCopy })
            })
    }

    handleChange = ({ target }) => {
        const { reply } = this.state
        const replyCopy = { ...reply }
        replyCopy[target.name] = target.value;
        this.setState({ reply: replyCopy })

    }

    loadEmail = () => {
        const { emailId } = this.props.match.params;
        emailService.getById(emailId).then(email => {
            this.setState({ email })
        })
    }


    render() {
        const { email, isReply } = this.state
        if (!email) return <div></div>
        return <div className="email-details flex">
            <Aside onComposeEmail={this.composeEmail} />
            <div className="main-container flex flex-column">

                <div className="upper-nav">
                    <i className="fas fa-arrow-left fa-large my-goback-icon cursor-pointer" title="Go back" onClick={this.onGoBack}></i>
                    <i className="fas fa-reply my-reply-icon icon-default cursor-pointer" onClick={this.onReply} title="Reply"></i>
                    <i className="fas fa-reply-all my-replyall-icon icon-default cursor-pointer" title="Reply All"></i>
                    <i onClick={() => { this.onRemoveEmail(email.id) }} title="Delete" className="far fa-trash-alt icon-default delete-icon cursor-pointer"></i>
                </div>
                <div className="flex space-between align-center">
                    <div className="user-details-container flex">
                        <div className="avatar-container">
                            <img src={email.avatarURL} alt="" className="user-avatar" />
                        </div>
                        <div className="from-container">
                            <h3 className="from cursor-pointer">{email.from}</h3>
                            <h5 className="from-address cursor-pointer">{email.fromAddress}</h5>
                        </div>
                    </div>
                    <div className="flex date-container">
                        <h3 className="date">{utilService.formatTime(email.sentAt)}</h3>
                    </div>
                </div>
                <div className="">
                    <p className="email-body">{email.body}</p>
                    <div className="prev-replies-container">
                        {email.replies.map((reply, idx) => {
                            console.log('reply key: ', idx, reply.sentAt);
                            return <p className="prev-reply" key={reply.sentAt}>{reply.txt}</p>
                        })}
                    </div>
                </div>
                {isReply && <div className="reply-container flex flex-column">
                    <textarea ref={this.replyRef} placeholder="Re:" name="txt" className="reply-field" rows="15" value={this.state.reply.txt} onChange={this.handleChange} />
                    <button className="reply reply-btn" onClick={this.onSendReply}>Reply</button>
                </div>}
                {this.state.isComposeOpen && <EmailCompose closeComposeWin={this.closeComposeWin} />}
            </div>
        </div>
    }
}