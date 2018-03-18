import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

	// Set up PropTypes config
	static propTypes = {
		currentBook: PropTypes.object.isRequired,
		onAddBook: PropTypes.func.isRequired
	}

	render() {

		// Destructure props object for easier reading
		const { currentBook, onAddBook } = this.props

		return(
			<li>
			  <div className="book">
			    <div className="book-top">
			      <div className="book-cover" style={{
			      	width: 128,
			      	height: 193,
			      	backgroundImage: `url(${currentBook.imageLinks.thumbnail})`
			      }}></div>
			      <div className="book-shelf-changer">
			        <select>
			          <option value="none" disabled>Move to...</option>
			          <option value="currentlyReading">Currently Reading</option>
			          <option value="wantToRead">Want to Read</option>
			          <option value="read">Read</option>
			          <option value="none">None</option>
			        </select>
			      </div>
			    </div>
			    <div className="book-title">{currentBook.title}</div>
			    <div className="book-authors">{currentBook.authors}</div>
			  </div>
			</li>
		)
	}
}

export default Book