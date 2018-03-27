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
		currentTerm: '',
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
    * Function to handle the form input changing and set component's state accordingly
  */
	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}


	updateResults = (query, results) => {
		this.setState({
			currentTerm: query,
			results: results
		})
	}


	/*
	 *	Goal of function is to return the API search results, but if any books are in the bookshelf already, to reflect their shelf property
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


	render() {

		const { books, onAddBook, options, approvedSearchTerms, makeReadable } = this.props
		const { query, currentTerm, results } = this.state

		// So if the user has typed something into our input box, meaning our this.state.query is truthy...
		if (query) {
			// To prevent an infinite loop, check the term has changed since the last search on the API
			if (query !== currentTerm) {
				// Check if it's a valid term in our API
				const validTerm = this.searchArray(query, approvedSearchTerms)
				// If it is, search the Books API
				if(validTerm) {
					BooksAPI.search(query).then((response) => {

						// The books returned from the BooksAPI search don't have any shelf property.
						// So cross reference the search API books against the current bookshelf books
						// If the search results books already have a shelf property, assign it, or set to none
						response = this.mergeObjectArrays(books, response)

						// Finally update this component's state with the results, and trigger a render via set.state
						this.updateResults(query, response)
					})
				}
			}
		}

		return (
			<div>
				<div className="search-books">
				  <div className="search-books-bar">
				    <div className="search-books-input-wrapper">
							{/* Bind input value to the query property in components state */}
				      <input
				      	type="text"
				      	placeholder="Search by title or author"
								value={query}
								onChange={ (event) => this.updateQuery(event.target.value) }
				      />
				    </div>
				  </div>
				</div>
				{/* Useful for debugging
			  	{JSON.stringify(this.state)}
			  */}
				<Link
					to='/'
					className='open-search'
				>Back to home page</Link>
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