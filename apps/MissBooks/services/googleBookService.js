export const googleBookService = {
    getGoogleBooks
}



function getGoogleBooks(bookName) { // Call it query instead of getGoogleBooks
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(url)
        .then(res => res.data)
        .catch(err => console.log(err))
}