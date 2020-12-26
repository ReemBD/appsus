import { emailService } from "../services/emailService.js"

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
        const { onSetFilter } = this.props
        if (ev.target.value || ev.target.value.length === 0) {
            console.log('ev.target.value: ', ev.target.value);
            filterBy[ev.target.name] = ev.target.value
        }
        else {
            filterBy[ev.target.dataset.name] = ev.target.dataset.value
        }
        this.setState({ filterBy }, () => {
            onSetFilter(this.state.filterBy);
        })
    }

    toggleDropDown = () => {
        const { isDropDownOpen } = this.state
        this.setState({ isDropDownOpen: !isDropDownOpen })
    }

    render() {
        const { isDropDownOpen, filterBy } = this.state
        return (
            <section className="email-filter flex">
                <div className="dropdown-container">
                    <i title="Filter By" className="fas fa-ellipsis-v cursor-pointer dropdown-icon" onClick={this.toggleDropDown}></i>
                    <ul className={`filter-dropdown ${!isDropDownOpen && 'display-none'}`}>
                        <li data-value="all" data-name="readStatus" onClick={this.handleChange}>All</li>
                        <li data-value="read" data-name="readStatus" onClick={this.handleChange}>Read {`(${emailService.getReadEmailsCount()})`}</li>
                        <li data-value="unread" data-name="readStatus" onClick={this.handleChange}>Unread {`(${emailService.getUnReadEmailsCount()})`}</li>
                    </ul>
                </div>
                <input type="text" name="text" className="search" value={filterBy.text} placeholder="Search" onChange={this.handleChange} />
            </section>
        )
    }
}


