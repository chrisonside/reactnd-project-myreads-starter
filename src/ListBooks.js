import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Shelf from './Shelf';
import loadingImage from './img/loading.png';
import errorImage from './img/error.png';

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onAddBook: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    makeReadable: PropTypes.func.isRequired,
    dataLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired
  }

  /*
    * This function returns an object whose keys are the shelf names.
    * The corresponding value for each key is an array made up of book objects that belong to that shelf
  */
  groupBy = (myArray, propToSeek) => {
    const groupedData = {};
    myArray.map((item) => {
      let prop = item[propToSeek];
      !groupedData[prop] && (groupedData[prop] = []);
      groupedData[prop].push(item);
    });
    return groupedData;
  };

  /*
    * Ciphen off books into individual shelves (itemsByCategory)
    * Then grab all the different shelf titles, and for each one, return UI for that shelf title
  */
  renderList = (data, category) => {
      const itemsByCategory = this.groupBy(data, category);
      const categories = Object.keys(itemsByCategory);
      return categories.map((categoryTitle) => (
        <Shelf
          key={categoryTitle}
          shelfTitle={categoryTitle}
          booksOnShelf={itemsByCategory[categoryTitle]}
          onAddBook={this.props.onAddBook}
          options={this.props.options}
          makeReadable={this.props.makeReadable}
        />
      ))
  };

  render() {

    const { books, dataLoading, errorMessage } = this.props;

    return (
      <div>
        <div className='list-books'>
          <div className='list-books-title'>
            <h1>MyReads</h1>
          </div>
          {errorMessage.length > 0 && (
            <div className='error'>
              <h3 className='error__header'>{errorMessage}</h3>
              <img className='error__logo' src={errorImage} width='150' alt='Error'/>
            </div>
          )}
          {(dataLoading && errorMessage.length === 0) && (
            <div className='loading'>
              <h3 className='loading__header'>Retrieving books...</h3>
              <img className='loading__logo' src={loadingImage} width='150' alt='Loading'/>
            </div>
          )}
          <div className='list-books-content'>
            {this.renderList(books, `shelf`)}
          </div>
        </div>
        <div className='open-search'>
          <Link
            to='/search'
            >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;