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
    * Function takes a camel case string and breaks it into a readable string
    * Note - this function is not my own - https://stackoverflow.com/questions/4149276/javascript-camelcase-to-regular-form#answer-6229124
  */
  makeReadable = (camelString) => {
    return camelString
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        // uppercase the first character
        .replace(/^./, function(str){ return str.toUpperCase(); })
  }

  /*
    * Function is called when user has used the dropdown tool to add a book to a shelf
    * First call the Book API to update the API as to the new shelf the book has been moved to
    * Once the book has been added, refetch the books API data and update our app's state, which will trigger a re-render.
  */
  onAddBook = (book, shelf) => {
    console.log('added a book', book, shelf)
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooksData()
    })
  }

  render() {

    const { books } = this.state

    // Set shelf names for our app
    const options = ['currentlyReading', 'wantToRead', 'read', 'none']

    const approvedSearchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

    // Convert our approved API search terms to lower case for easier comparison with search query
    const lowerCaseSearchTerms = []
    approvedSearchTerms.map( (term) => {
      lowerCaseSearchTerms.push( term.toLowerCase() )
    })

    return (
      <div className='app'>

        {/* Update UI based on the URL, using React Router's <Route> tag */}
        <Route exact path='/' render={() => (
          <ListBooks
            books={books}
            onAddBook={this.onAddBook}
            options={options}
            makeReadable={this.makeReadable}
          />
        )}/>

        <Route path='/search' render={() => (
          <SearchBooks
            books={books}
            onAddBook={this.onAddBook}
            options={options}
            approvedSearchTerms={lowerCaseSearchTerms}
            makeReadable={this.makeReadable}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
