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
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /*
    * Function is called when user has searched on a book and used the dropdown tool to add book to a shelf
    * First call the Book API to update the API as to the new shelf the book has been moved to
    * Then re-set our app's state, which will trigger a re-render.
  */
  addBook = (book, bookShelf) => {
  }

  render() {
    return (
      <div className='app'>

        {/* Update UI based on the URL, using React Router's <Route> tag */}
        <Route exact path='/' render={() => (
          <ListBooks
            onAddBook={this.addBook}
            books={this.state.books}
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
