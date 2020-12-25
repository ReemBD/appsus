import { emailService } from "../services/emailService"

export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            text: '',
            readStatus: ''
        },
        isDropDownOpen: false
    }

    handleChange = (ev) => {
        const filterBy = { ...this.state.filterBy }
        if (ev.target.value) {
            filterBy[ev.target.name] = ev.target.value
        }
        else {
            filterBy[ev.target.dataset.name] = ev.target.dataset.value
        }
        this.setState({ filterBy }, () => {
            this.props.onSetFilter(this.state.filterBy);
        })
        // const value = ev.target.type === 'text' ? +ev.target.value : ev.target.value;

        // const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        // const field = ev.target.name;
        // this.setState({ [field]: value }, callback)
    }

    componentDidMount() {
    }
    /* 
        two types of filter: text, and select.
        with text its easy because im filtering by the text that is written. by the value.
        but with select i need another method. what do i need with select?
        the trouble is that select should define 
    */
    toggleDropDown = () => {
        const { isDropDownOpen } = this.state
        this.setState({ isDropDownOpen: !isDropDownOpen })
    }

    render() {
        const { isDropDownOpen } = this.state
        return (
            <section className="email-filter flex">
                 <div className="dropdown-container">
                    <i className="fas fa-ellipsis-v cursor-pointer dropdown-icon" onClick={this.toggleDropDown}></i>
                    <ul className={`filter-dropdown ${!isDropDownOpen && 'display-none'}`}>
                        <li data-value="all" data-name="readStatus" onClick={this.handleChange}>All</li>
                        <li data-value="read" data-name="readStatus" onClick={this.handleChange}>Read {`(${emailService.getReadEmailsCount()})`}</li>
                        <li data-value="unread" data-name="readStatus" onClick={this.handleChange}>Unread {`(${emailService.getUnReadEmailsCount()})`}</li>
                    </ul>
                </div>
                <input type="text" name="text" className="search" value={this.state.filterBy.text} placeholder="Search" onChange={this.handleChange} />
               
                {/* <select onChange={this.handleChange} name="readStatus" className="cursor-pointer" id="">
                    <option value="all" className="cursor-pointer">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select> */}
            </section>
        )
    }
}

const filters = [
    {
        type: 'selectBox',
        info: {
            label: 'Filter By: ',
            opts: ['read', 'unnread', 'marked', 'unmarked']
        }
    },
    {
        type: 'textBox',
        info: {
            label: 'search:'
        }
    }
]

function DynamicFilterCmp({ currCmp, info, onSetFilter }) {
    switch (currCmp) {
        case 'textBox':
            return <inputBox info={info} onSetFilter={onSetFilter} />
    }
}

function SelectBox({ info, onAns }) {
    return <label>
        {info.label}
        <select onChange={(ev) => {
            onAns(ev.target.value)
        }}>
            {info.opts.map(opt => <option key={opt}>{opt}</option>)}
        </select>
    </label>
}

function InputBox({ info, onAns }) {
    return <label>
        {info.label}
        <input placeholder={info.label} onChange={(ev) => {
            onAns(ev.target.value)
        }} />
    </label>
}


