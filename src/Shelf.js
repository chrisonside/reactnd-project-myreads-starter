import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {

	static propTypes = {
		shelfTitle: PropTypes.string.isRequired,
		booksOnShelf: PropTypes.array.isRequired,
		onAddBook: PropTypes.func.isRequired,
		options: PropTypes.array.isRequired
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

	render() {

		// Descructure props object for easier reading
		const {shelfTitle, booksOnShelf, onAddBook, options} = this.props;

		return (
			<div>
				<div className='bookshelf'>
					<h2 className='bookshelf-title'>{this.makeReadable(shelfTitle)}</h2>
					<div className='bookshelf-books'>
						<ol className='books-grid'>
							{booksOnShelf.map((book) => (
								<Book
									key={book.id}
									currentBook={book}
									onAddBook={onAddBook}
									makeReadable={this.makeReadable}
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

export default Shelf