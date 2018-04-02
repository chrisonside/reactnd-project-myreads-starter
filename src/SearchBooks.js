import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Results from './Results'
import sortBy from 'sort-by'
import * as BooksAPI from './utils/BooksAPI'

const TYPING_FINISHED_DELAY = 800;

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
		validSearch: 'search-is-valid',
		timer: null,
		results: []
	}

	/*
    * Function searches data for a specific string
    * Returns a boolean (true if string exists in data)
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
	 *	Function loops through searchResults and if any books are in a shelf already, that shelf property is added
	 *	Returns updated searchResults
	*/
	mergeObjectArrays = (books, searchResults) => {
		searchResults.map((searchResult) => {
			// For each search result, loop through the current bookshelf books and see if there's a match
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
    * Function to update component's query state based on latest user input
  */
	handleQueryUpdate = (event) => {
		let query;
		// Deal with backspace being hit on the keydowns
		if(event.type === 'keydown') {
			if(event.keyCode === 8) {
				event.preventDefault();
				query = this.state.query.slice(0, -1);
			} else {
				// For all other keydown events we want to ignore these
				return;
			}
		} else {
			// Handle onchange events
			query = event.target.value;
		}

		this.setState({	query })

		return;
	}


	/*
    * Function to update component's results state based on user input
  */
	updateResults = (event) => {
		let query = this.state.query.trim();
		// If the user has typed something in input field, meaning this.state.query is truthy
		// And if that query is an approved search term
		if (query && this.searchArray(query, this.props.approvedSearchTerms) ) {
			// Search the Books API
			BooksAPI.search(query).then((response) => {
				// As returned books don't have shelf property, cross reference them against current bookshelf books
				response = this.mergeObjectArrays(this.props.books, response)
				// Finally update this component's state with the results and trigger re-render
				this.setState({
					validSearch: 'search-is-valid',
					results: response
				})
			})
			// }
		} else {
			this.setState({
				validSearch: 'search-not-valid',
				results: []
			})
		}
	}

	/*
    * Function to handle the form input changing
    * Function updates query state immediately, and results once user has stopped typing
  */
	handleInputChange(event) {
		// If user has added to input since we last started our (handling input change)setTimeout, cancel that setTimeOut
		clearTimeout(this.state.timer);

		// Update component's query state
		this.handleQueryUpdate(event);

		// If our timeout limit has passed, assume user has finished typing and show results
		this.state.timer = setTimeout(this.updateResults.bind(event), TYPING_FINISHED_DELAY);
  }

	render() {

		const { books, onAddBook, options, approvedSearchTerms, makeReadable } = this.props
		const { query, results, validSearch } = this.state

		// Ready approved search terms for displaying to user
		const terms = approvedSearchTerms.join(', ');

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
								onChange={ (event) => this.handleInputChange(event) }
								onKeyDown={ (event) => this.handleInputChange(event) }
				      />
				    </div>
				  </div>
				</div>
				{/* Useful for debugging
			  	{JSON.stringify(this.state)}
			  */}
			  <div className="search-books-help">
					<h2 className={validSearch + ' search-books-heading'}>The following search terms are valid:</h2>
      		<div className="search-books-terms">{terms}</div>
      	</div>
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