import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

	// Set up PropTypes config
	static propTypes = {
		currentBook: PropTypes.object.isRequired,
		onAddBook: PropTypes.func.isRequired,
		makeReadable: PropTypes.func.isRequired,
		options: PropTypes.array.isRequired
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

	render() {

		// Destructure props object for easier reading
		const { currentBook, onAddBook, options } = this.props

		return(
			<li>
			  <div className='book'>
			    <div className='book-top'>
			      <div className='book-cover' style={{
			      	width: 128,
			      	height: 193,
			      	backgroundImage: `url(${currentBook.imageLinks.thumbnail})`
			      }}></div>
			      <div className='book-shelf-changer'>
			        <select value={currentBook.shelf} onChange={(event) => onAddBook(currentBook, event.target.value)}>
			          <option value='none' disabled>Move to...</option>
			          {this.renderOptions(options)}
			        </select>
			      </div>
			    </div>
			    <div className='book-title'>{currentBook.title}</div>
			    <div className='book-authors'>{currentBook.authors}</div>
			  </div>
			</li>
		)
	}
}

export default Book