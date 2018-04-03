import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Shelf extends Component {

  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    booksOnShelf: PropTypes.array.isRequired,
    onAddBook: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    makeReadable: PropTypes.func.isRequired
  }

  render() {

    const {shelfTitle, booksOnShelf, onAddBook, options, makeReadable} = this.props;

    return (
      <div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>{makeReadable(shelfTitle)}</h2>
          <div className='bookshelf-books'>
            <ol className='books-grid'>
              {booksOnShelf.map((book) => (
                <Book
                  key={book.id}
                  currentBook={book}
                  onAddBook={onAddBook}
                  makeReadable={makeReadable}
                  options={options}
                />
              ))
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Shelf;