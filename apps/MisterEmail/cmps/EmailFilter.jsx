export class EmailFilter extends React.Component {

    state = {
        text: '',
        readStatus: '',
    }

    handelChange = ({ target }) => {
        this.setState({ [target.name]: target.value }, () => { this.props.onSetFilter(this.state) })
        const value = ev.target.type === 'text' ? +ev.target.value : ev.target.value;
        // const callback = () => {
        //     this.props.onSetFilter(this.state);
        // };
        // const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        // const field = ev.target.name;
        // this.setState({ [field]: value }, callback)

    }



    render() {
        return (
            <section className="email-filter">
                <input type="text" name="text"
                    value={this.state.subject}
                    placeholder="Filter by text"
                    onChange={this.handelChange} />
                <input type="button" name="lowPrice" value={this.state.lowPrice} onChange={this.handelChange} />
            </section>
        )
    }
}