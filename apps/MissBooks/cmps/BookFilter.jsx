import { BookAdd } from './BookAdd.jsx'

export class BookFilter extends React.Component {
    state = { // for the future, make an object inside the state
        title: '',
        price: 0
    }

    handleChange = (ev) => {
        const callback = () => {
            this.props.onSetFilter(this.state)
        }
        this.setState({
            [ev.target.name]: ev.target.type === 'number' ? +ev.target.value : ev.target.value
        }, callback)
    }




    render() {
        return (
            <section className='filters-input'>
                <label htmlFor="price">Price</label>
                <input type="range" max='250' id="price" name="price" value={this.state.price} onChange={this.handleChange} /> <span style={{ marginBottom: '5px' }}>{this.state.price}</span>
                <input type="text" name="title" value={this.state.title}
                    placeholder="Filter by name" onChange={this.handleChange} />
                <BookAdd onGoogleBookAdd={this.props.onGoogleBookAdd} />
            </section>
        )
    }

}