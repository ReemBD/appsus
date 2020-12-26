import { googleBookService } from '../services/googleBookService.js'
import { GoogleBooksList } from './GoogleBooksList.jsx';
import { eventBusService } from '../../../services/eventBusService.js';


export class BookAdd extends React.Component {
    state = {
        isHidden: true,
        googleBooks: []
    }

    onAddGoogleBook = (idx) => {
        this.props.onGoogleBookAdd(this.state.googleBooks[idx])
        const bookId = this.state.googleBooks[idx].id
        eventBusService.emit('showMsg', `Book Successfully Added!`)
    }

    handleChange = (ev) => {
        if (!ev.target.value) return;
        googleBookService.getGoogleBooks(ev.target.value)
            .then(books => this.setState({ googleBooks: books.items.splice(0, 4) }))
    }

    toggleSearch = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }



    render() {
        return (
            <div className='book-search-input'>
                <button onClick={this.toggleSearch}>{this.state.isHidden ? 'Add Book' : 'Close'}</button>
                <div className="add-input" hidden={this.state.isHidden}>
                    <div className="add-input-container">

                        <input type="text" placeholder="Search for a book" name="name" onChange={this.handleChange} />
                        {this.state.googleBooks && <GoogleBooksList addBook={this.onAddGoogleBook} googleBooks={this.state.googleBooks} />}
                    </div>
                </div>
            </div>
        )
    }
}
