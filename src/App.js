import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends Component {
  /*
    * Populate state's book shelf books data once API has been called
  */
  state = {
    books: []
  }

  /*
    * Once BooksApp component has rendered, call the Books API and update our app's state with books data
  */
  componentDidMount() {
    this.getAllBooksData()
  }

  /*
    * Function to call the Books API and update our app's state with books data
  */
  getAllBooksData() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /*
    * Function is called when user has used the dropdown tool to add a book to a shelf
    * First call the Book API to update the API as to the new shelf the book has been moved to
    * Once the book has been added, refetch the books API data and update our app's state, which will trigger a re-render.
  */
  onAddBook = (book, shelf) => {
    console.log(book, shelf)
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooksData()
    })
  }

  render() {

    // Set shelf names for our app
    const options = ['currentlyReading', 'wantToRead', 'read', 'none']

    return (
      <div className='app'>

        {/* Update UI based on the URL, using React Router's <Route> tag */}
        <Route exact path='/' render={() => (
          <ListBooks
            onAddBook={this.onAddBook}
            books={this.state.books}
            options={options}
          />
        )}/>

        <Route path='/search' render={() => (
          <SearchBooks
            onAddBook={this.addBook}
            books={this.state.books}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
