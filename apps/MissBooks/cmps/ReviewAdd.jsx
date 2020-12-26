import { bookService } from '../services/book-service.js'

export class ReviewAdd extends React.Component {

    state = {
        review: {
            fullName: 'Annonymus',
            rate: '⭐',
            readAt: 2020,
            text: '',
            bookId: ''

        }
    }

    elInput = React.createRef();

    componentDidMount() {
        const { bookId } = this.props.match.params
        this.elInput.current.focus()
    }


    onSaveReview = (ev) => {
        ev.preventDefault()
        this.state.review.bookId = this.props.match.params.bookId

        bookService.save(this.state.review, this.state.review.bookId)
        this.props.history.push(`/book/${this.props.match.params.bookId}`);

    }

    onInputChange = (ev) => {

        const value = ev.target.value;

        const reviewCopy = { ...this.state.review }
        reviewCopy[ev.target.name] = value;

        this.setState({
            review: reviewCopy
        })
    }

    render() {
        return (
            <div className='review-container '>
                <form className=' flex flex-column' onSubmit={this.onSaveReview}>
                    <input type="text" placeholder="Your Name" value={this.state.review.fullName} name="fullName" onChange={this.onInputChange} ref={this.elInput} />
                    <label htmlFor="rate">Rate The Book</label>
                    <select id="rate" name="rate" value={this.state.review.rate} onChange={this.onInputChange}>
                        <option value="⭐">⭐</option>
                        <option value="⭐⭐">⭐⭐</option>
                        <option value="⭐⭐⭐">⭐⭐⭐</option>
                        <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                        <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                    </select>
                    <label htmlFor="date">Read at</label>
                    <input type="date" id="date" value={this.state.review.readAt} name="readAt" onChange={this.onInputChange}></input>
                    <label htmlFor="review"></label>
                    <textarea id="review" value={this.state.review.text} name="text" onChange={this.onInputChange}></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}


