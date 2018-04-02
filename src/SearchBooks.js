import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Results from './Results'
import sortBy from 'sort-by'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		onAddBook: PropTypes.func.isRequired,
		options: PropTypes.array.isRequired,
		approvedSearchTerms: PropTypes.array.isRequired,
		makeReadable: PropTypes.func.isRequired
	}

	state = {
		query: '',
		results: []
	}

	/*
    * This function is used to search the approved terms, to see if the input query is a valid search term
  */
	searchArray = (query, data) => {
		let searchTerm = query.toLowerCase();
		var index = -1;

		data.some( (element, i)  => {
    	if ( searchTerm === element ) {
				index = i;
			}
		})

		if(index !== -1) {
			return true
		} else {
			return false
		}
	}

	/*
	 *	Function returns API search results, but if any books are in a shelf already, add their shelf property
	*/
	mergeObjectArrays = (books, searchResults) => {
		// Loop through books in my search searchResults (where we will know there will be a max of 20 searchResults)
		searchResults.map((searchResult) => {

			// For each search result, loop through the current bookhself books and see if there's a match
			let bookMatch = books.filter((book) => {
				return searchResult.id === book.id
			})

			// If there is a match, add that shelf property to this search result
			if(bookMatch.length > 0) {
				searchResult['shelf'] = bookMatch[0].shelf
			}

		})

		return searchResults
	}

	/*
    * Function to handle the form input changing and set component's state accordingly
  */
	updateQuery = (event) => {
		let query;
		// Handle keyups - only deal with backspace being hit on the keydowns
		if(event.type === 'keydown') {
			if(event.keyCode === 8) {
				event.preventDefault();
				query = this.state.query.slice(0, -1);
			} else {
				// For all other keydown events we want to ignore these
				return;
			}
		} else {
			// Handle onchange
			query = event.target.value;
		}

		// So if the user has typed something into our input box, meaning our this.state.query is truthy...
		// And if it's an approved search term...
		if (query && this.searchArray(query, this.props.approvedSearchTerms) ) {
			this.setState({	query })
			// Search the Books API
			BooksAPI.search(query).then((response) => {
				// The books returned from the BooksAPI search don't have any shelf property.
				// So cross reference the search API books against the current bookshelf books
				// If the search results books already have a shelf property, assign it, or set to none
				response = this.mergeObjectArrays(this.props.books, response)

				// Finally update this component's state with the results, and trigger a render via set.state
				this.setState({
					results: response
				})
			})
			// }
		} else {
			this.setState({
				query: query,
				results: []
			})
		}
	}

	render() {

		const { books, onAddBook, options, approvedSearchTerms, makeReadable } = this.props
		const { query, results } = this.state

		return (
			<div>
				<div className="search-books">
				  <div className="search-books-bar">
				  <Link
					to="/"
					className="close-search"
				>Back to home page</Link>
				    <div className="search-books-input-wrapper">
							{/* Bind input value to the query property in components state */}
				      <input
				      	type="text"
				      	placeholder="Search by title or author"
								value={query}
								onChange={ (event) => this.updateQuery(event) }
								onKeyDown={ (event) => this.updateQuery(event) }
				      />
				    </div>
				  </div>
				</div>
				{/* Useful for debugging
			  	{JSON.stringify(this.state)}
			  */}
				{results.length > 0 && (
        	<Results
						results={results}
						onAddBook={onAddBook}
						options={options}
						makeReadable={makeReadable}
        	/>
        )}
			</div>
		)
	}
}

export default SearchBooks