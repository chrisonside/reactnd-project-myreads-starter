import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Results extends Component {

	static propTypes = {
		results: PropTypes.array.isRequired,
		onAddBook: PropTypes.func.isRequired,
		options: PropTypes.array.isRequired,
		makeReadable: PropTypes.func.isRequired,
	}

	render() {

		const {results, onAddBook, options} = this.props

		return (
			<div className="search-books-results">
			  <div>
					<div className='bookshelf'>
						<h2 className='bookshelf-title'>Search results</h2>
						<div className='bookshelf-books'>
							<ol className='books-grid'>
								{results.map((book) => (
									<Book
										key={book.id}
										currentBook={book}
										onAddBook={onAddBook}
										options={options}
										makeReadable={this.props.makeReadable}
									/>
								))
								}
							</ol>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Results