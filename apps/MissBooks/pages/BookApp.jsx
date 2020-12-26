import { bookService } from '../services/book-service.js'
import { BookList } from '../cmps/BookList.jsx';
import { BookFilter } from '../cmps/BookFilter.jsx'
import { eventBusService } from '../../../services/eventBusService.js';
export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: {
            title: '',
            price: -Infinity
        },
        selectedBookId: null,
        msg: '',
        lastAddedBookId: ''
    }

    componentDidMount() {
        this.loadBooks();
        this.unsubscribe = eventBusService.on('showMsg', (msg) => {
            this.setState({ msg }, () => {
                setTimeout(() => {
                    this.setState({ msg: '' })
                }, 3000)
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    loadBooks = () => {
        bookService.query()
            .then(books => this.setState({ books }))

    }

    onSelectBook = (bookId) => {
        this.setState({
            selectedBookId: bookId
        })
    }

    onUnselectBook = () => {
        this.setState({
            selectedBookId: null
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    getBooksForDisplay = () => {
        const { filterBy } = this.state
        return this.state.books.filter(book => {
            return book.title.toLowerCase().includes(filterBy.title.toLowerCase()) && book.listPrice.amount > filterBy.price;
        });
    };

    onGoogleBookAdd = (book) => {
        bookService.addGoogleBook(book)
            .then(bookToAdd => {
                const copyBooks = this.state.books
                copyBooks.push(bookToAdd)
                this.setState({ books: copyBooks, lastAddedBookId: bookToAdd.id })
                this.loadBooks()
            })
    }

    forceUpdateHandler() {
        this.forceUpdate();
    }

    render() {
        const { msg } = this.state
        return (
            <section className="book-app main-book-layout swing-in-top-fwd">
                {msg && <div className='user-msg'>
                    <div>
                        {msg}
                    </div>
                    <div>
                        <a href={`/#/book/${this.state.lastAddedBookId}`}>Check it out</a>
                    </div>
                </div>}
                <div className='book-app-filter'>


                    <h3>Filter: </h3>
                    <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} onGoogleBookAdd={this.onGoogleBookAdd} />
                </div>
                <BookList books={this.getBooksForDisplay()} />

            </section>
        )

    }
}

export default BookApp
