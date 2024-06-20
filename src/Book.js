import React, { Component } from 'react'


class Book extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            shelf: ''
        }
    }
    componentDidMount = () => {
        this.setState({shelf: this.props.book.shelf})
    }

    moveBook = (event) => {
        const shelf = event.target.value;
        this.props.moveBook(this.props.book, shelf)

        this.setState({shelf});
    }


    render(){

        const {book} = this.props;
        //error handling for books without authors or imageLinks
        const {imageLinks = '', authors = ['unknown']} = book;
        const {shelf} = this.state;

        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})`}}></div>
                        <div className="book-shelf-changer">
                            {/* if no shelf assigned to book, assign "none" */}
                            <select value={shelf ? shelf: 'none'} onChange={this.moveBook}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {authors.map(author =>
                        <div key={author} className="book-authors">{author}</div>
                        )}
                </div>
            </li>
        )
    }
}

export default Book