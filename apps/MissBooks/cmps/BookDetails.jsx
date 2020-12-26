import { bookService } from '../services/book-service.js'
import { Reviews } from './Reviews.jsx'
const { Link } = ReactRouterDOM;


export class BookDetails extends React.Component {

    state = {
        book: null,
    }

    componentDidMount() {
        const { bookId } = this.props.match.params;
        bookService.getBookById(bookId).then(book => {
            this.setState({ book });
        });
    }

    getPageCountForDisplay = () => {
        let pageCount;
        if (this.state.book.pageCount > 500) pageCount = 'Long Reading';
        else if (this.state.book.pageCount > 200) pageCount = 'Decent Reading';
        else pageCount = 'Light Reading'
        return pageCount;
    }

    getBookPriceColor = () => {
        let bookColor;
        const bookPrice = this.state.book.listPrice.amount
        if (bookPrice > 150) bookColor = 'red';
        else if (bookPrice < 20) bookColor = 'green';
        else bookColor = 'initial';
        return bookColor
    }

    getBookPublishDateText = () => {
        let bookPublishText;
        const bookPublish = this.state.book.publishedDate;
        const currentYear = new Date().getFullYear()
        bookPublishText = (currentYear - bookPublish > 10) ? 'Veteran Book!' : 'New!'
        return bookPublishText;
    }

    showBookOnSale = () => {
        if (this.state.book.listPrice.isOnSale) {
            return 'On sale! 30% off!'
        }
    }



    render() {
        if (!this.state.book) return <div className='flex flex-center'>Loading...</div>

        return (
            <div className='book-full-details'>
                <div className='book-img-container'>
                    <img src={this.state.book.thumbnail} alt="" />
                </div>
                <div className="book-details-text">
                    <h1>{this.state.book.title}</h1>
                    <h4>Author: {this.state.book.authors[0]}</h4>
                    <h5>{this.state.book.description}</h5>
                    <h6>{this.state.book.subtitle}</h6>
                    <p className='book-page-count'>{this.getPageCountForDisplay()}</p>
                    <p className='book-publish-date'>{this.getBookPublishDateText()} Published at: {this.state.book.publishedDate}</p>
                    <span>{this.showBookOnSale()}</span><p>Price: <span className={this.getBookPriceColor()}>{this.state.book.listPrice.amount} </span><span>{bookService.getCurrency(this.state.book.listPrice.currencyCode)}</span></p>
                    <Link to={`/book/review/${this.state.book.id}`}><button>Write a review about this book.</button></Link>
                </div>


                <Link to="/book">
                    <button className='back-to-gallery-btn'>Back</button>
                </Link>
                <div>
                    <Reviews book={this.state.book} />
                </div>
            </div >



        )
    }
}