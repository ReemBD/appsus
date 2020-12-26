import { BookPreview } from './BookPreview.jsx';

export function BookList({ books }) {

    return (
        books.map(book => {
            return <BookPreview key={book.id} book={book} />
        })
    )
}