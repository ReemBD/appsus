export function GoogleBooksPreview(props) {
    return (
        <li className='google-book-list-item'>{props.book.volumeInfo.title} <button onClick={props.addBook}>+</button></li>
    )
}