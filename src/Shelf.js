import React from 'react'
import Book from './Book.js'


const Shelf = (props) => {
    const {shelf, moveBook} = props;

    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.type}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelf.books.map(book => 
                            <Book 
                                key={book.id}
                                book={book}
                                moveBook={moveBook}
                            />)}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Shelf