

export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            txt: ''
        }
    }

    handleChange = (ev) => {
        const filterBy = { ...this.state.filterBy }
        filterBy[ev.target.name] = ev.target.value

        this.setState({ filterBy }, () => { this.props.setFilter(this.state.filterBy) })
    }

    render() {
        return (
            <div className="note-filter flex flex-center">
                <input type="text" name="txt"
                    value={this.state.filterBy.txt}
                    placeholder="Search"
                    autoComplete="off"
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}
