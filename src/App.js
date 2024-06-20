import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
//mycode
import SearchBook from './SearchBook'
import AllShelves from './AllShelves'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      //mycode
      books: [],
      explanation: ''
  }
}


  moveBook = (bookToMove, newShelf) => {

        //Suggestion from @Forrest
        //update API books array
        BooksAPI.update(bookToMove, newShelf)
        //if successful, make a fresh request for the API books array
        .then(() => BooksAPI.getAll())
        //update the local state to match the API books array
        .then(res=> this.setState({books: res}))
        //error handling
        .catch((error) => this.setState({explanation: 'Error Moving Book: '+error}))
  }
 
  

  componentDidMount() {
    BooksAPI.getAll()
    .then((result) => {
      this.setState({books: result});
    })
    .catch(error => this.setState({explanation: error}))
  }


  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <AllShelves 
            books={this.state.books}
            explanation={this.state.explanation}
            moveBook={this.moveBook}
          />
        )}/>

        <Route path='/search' render={() => (
          <SearchBook 
            books={this.state.books}
            explanation={this.state.explanation}
            moveBook={this.moveBook}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
