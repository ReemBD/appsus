export function Reviews(props) {
    if (!props.book.reviews) return (
        <section>
            <h4>No Reviews Yet...</h4>
            <h3>Be the first one to add a review!</h3>
        </section>
    )

    return (
        <section className='reviews-section'>
            <h2>Reviews ({props.book.reviews.length})</h2>
            {props.book.reviews.map(review => {
                return (
                    <div key={1 + props.book.reviews.length} className='single-review'>
                        <p>{review.fullName}</p>
                        <p>Rating: {review.rate}</p>
                        <p>Read at: {review.readAt}</p>
                        <p>{review.text}</p>
                    </div>
                )
            })}
        </section>

    )
}