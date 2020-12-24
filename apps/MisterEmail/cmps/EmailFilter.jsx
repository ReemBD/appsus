export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            text: '',
            readStatus: ''
        }
    }

    handleChange = (ev) => {
        console.log('ev.target.value', ev.target.value);
        console.log('ev.target.name ', ev.target.name);
        const filterBy = { ...this.state.filterBy }
        console.log('filterBy: ', filterBy);
        filterBy[ev.target.name] = ev.target.value;
        this.setState({ filterBy }, () => {
            console.log('this.state.filterBy: ', this.state.filterBy);
            this.props.onSetFilter(this.state.filterBy);
        })
        // const value = ev.target.type === 'text' ? +ev.target.value : ev.target.value;

        // const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        // const field = ev.target.name;
        // this.setState({ [field]: value }, callback)
    }

    /* 
        two types of filter: text, and select.
        with text its easy because im filtering by the text that is written. by the value.
        but with select i need another method. what do i need with select?
        the trouble is that select should define 
    */


    render() {
        return (
            <section className="email-filter flex">
                <input type="text" name="text"
                    value={this.state.filterBy.text}
                    placeholder="Filter by text"
                    onChange={this.handleChange} />
                <select onChange={this.handleChange} name="readStatus" id="">
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
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


