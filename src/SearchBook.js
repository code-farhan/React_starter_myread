import React, { Component } from 'react'
import Book from './Book.js'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class SearchBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: '',
            books: [],
            explanation: ''
        }
    }

    //inspiration from @Rodrick webinar https://drive.google.com/drive/u/0/folders/1SMvuv0-r98pVfZQA2IKToBVfXtOuD01X
    //for each matching search result, if the book is already on our shelf,
    //set the search result book's shelf to match the existing book's shelf
    syncBooks = (queryBooksList) => {
        return  (queryBooksList.map(book => {
            const myBook = this.props.books.find(item => item.id === book.id);
            if (myBook) {
                book['shelf'] = myBook.shelf;
            }

            return book;
        }))
    }

    updateQuery = (event) => {
        const query = event.target.value;
        this.setState({ query });
        if (query === '') {
            //if search input is empty, show no books, clear any error messages
            this.setState({books: [], explanation: ''})
        } else {
            BooksAPI.search(query)
            .then(res => {
                if(res.error) {
                    //if search API call returns an error, show no books, message "no results"
                    this.setState({books: [], explanation: 'No Results Found'})
                } else {
                this.setState({books: this.syncBooks(res), explanation: ''})
                }
            })
        }
    }
    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {
        //inspiration on structure from @Rodrick webinar https://drive.google.com/drive/u/0/folders/1SMvuv0-r98pVfZQA2IKToBVfXtOuD01X
        const {moveBook} = this.props; 

        const {books, explanation} = this.state;
        const {query} = this.state


        return (
            //original copied from App.js, with modifications
            <div className="search-books">
            <div className="search-books-bar">
              <Link 
                className="close-search" 
                to='/'
                >
                Close
                </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={query} 
                    onChange={(event) => this.updateQuery(event)}
                />
              </div>
            </div>
            <div className="search-books-results">
              {/* display any messages or errors here */}
              <div>
                  <h2>{explanation}</h2>
              </div>
              <ol className="books-grid">
                {books.map((book) => 
                    <Book 
                    key={book.id}
                    book={book}
                    moveBook={moveBook}
                    />)
                }
              </ol>
            </div>
          </div>        
          )
    }
}

export default SearchBook