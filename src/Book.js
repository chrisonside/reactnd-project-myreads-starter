import React, { Component } from 'react';
import PropTypes from 'prop-types'
import backUpImage from './img/coming-soon.jpg';

class Book extends Component {

	// Set up PropTypes config
	static propTypes = {
		currentBook: PropTypes.object.isRequired,
		onAddBook: PropTypes.func.isRequired,
		makeReadable: PropTypes.func.isRequired,
		options: PropTypes.array.isRequired,
	}

	/*
		* Function renders option tags for select dropdown
		* Option values are generated from the shelves data passed to this component
	*/
	renderOptions = (options) => {
		return options.map((option, index) => (
			<option
				key={this.props.currentBook.id + index}
				value={option}>{this.props.makeReadable(option)}
			</option>
		))
	}

	/*
		* Function handles situation where book does not have a thumbnail
		* Returns the thumbnail or an imported back up image
	*/
	handleBgImage = (book) => {
		let bgImageURL;
		if(typeof book.imageLinks === 'undefined') {
			bgImageURL = `url(${backUpImage})`
		} else {
			bgImageURL = `url(${book.imageLinks.thumbnail})`
		}
		return bgImageURL
	}

	render() {

		const { currentBook, onAddBook, options } = this.props

		return(
			<li>
			  <div className='book'>
			    <div className='book-top'>
			      <div className='book-cover' style={{
			      	width: 128,
			      	height: 193,
			      	// backgroundImage: `url(${backUpImage})`
			      	backgroundImage: this.handleBgImage(currentBook)
			      }}></div>
			      <div className='book-shelf-changer'>
			        <select value={currentBook.shelf} onChange={(event) => onAddBook(currentBook, event.target.value)}>
			          <option value='none' disabled>Move to...</option>
			          {this.renderOptions(options)}
			        </select>
			      </div>
			    </div>
			    <div className='book-title'>{currentBook.title}</div>
			  </div>
			</li>
		)
	}
}

export default Book