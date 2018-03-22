import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		onAddBook: PropTypes.func.isRequired,
		options: PropTypes.array.isRequired,
		approvedSearchTerms: PropTypes.array.isRequired
	}

	state = {
		query: ''
	}

	searchArray = (query, data) => {
		let searchTerm = query.toLowerCase();

		data.some( (element)  => {
    	if ( searchTerm === element ) {
				return true
			} else {
				return false
			}
		})
	}


	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	searchApi = (query, searchableTerms) => {
		// Only trouble the API if an approved search term is being used
		let bool = this.searchArray(query, searchableTerms)
		console.log(this.searchArray(query, searchableTerms))
		// console.log(this.searchArray(query, searchableTerms))
		// console.log(this.searchArray(query, searchableTerms)) ? console.log('search api') : console.log('jog on') ;


		// ( this.props.approvedSearchTerms.includes(searchString) ) ? console.log(true) : console.log(false) ;

		// BooksAPI.search(query).then((response) => {
		// 	// return response
		// 	console.log(response)


		// })
	}

	render() {

		const { books, onAddBook, options, approvedSearchTerms } = this.props
		const { query } = this.state

		// Convert our approved API search terms to lower case for easier comparison with search query
		const lowerCaseSearchTerms = []
		approvedSearchTerms.map( (term) => {
			lowerCaseSearchTerms.push( term.toLowerCase() );
		})

		let booksInAPI
		// So if the user has typed something into our input box, meaning our this.state.query is truthy...
		if (query) {
			// let booksInAPI = this.searchApi(query)
			this.searchApi(query, lowerCaseSearchTerms)
			// console.log(booksInAPI)

			// if(booksInAPI.items.length > 0) {
			// 	booksInAPI.sort(sortBy('name'))
			// 	console.log(booksInAPI)
			// }
		}

		return (
			<div className="search-books">
			  <div className="search-books-bar">

			    <Link
						to='/'
						className='add-contact'
					>Back to home page</Link>

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
			  <div className="search-books-results">

			  	{/* Useful for debugging */}
			  	{JSON.stringify(this.state)}

			    <ol className="books-grid">

			    </ol>

			  </div>
			</div>
		)
	}
}

export default SearchBooks