import { GoogleBooksPreview } from './GoogleBooksPreview.jsx';
import { utilService } from '../../../services/utilService.js'

export function GoogleBooksList(props) {
    return props.googleBooks.map((book, idx) => {
        return (
            <GoogleBooksPreview key={utilService.makeId} book={book} addBook={() => props.addBook(idx)} />
        )
    })
}