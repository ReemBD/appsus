import { bookService } from "../services/book-service";

const { Link } = ReactRouterDOM;
export function BookPreview({ book, onSelectBook }) {


    return <Link to={`/book/${book.id}`} >
        <div className='book-preview'>
            <h1>{book.title}</h1>
            <img src={book.thumbnail} />
            <p>{book.pageCount} Pages</p>
            <p>{book.listPrice.amount} <span>{bookService.getCurrency(book.listPrice.currencyCode)}</span></p>
            <button>More Info</button>
        </div>
    </Link>
}