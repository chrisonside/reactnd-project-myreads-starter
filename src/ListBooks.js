import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
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
		* This function loops through an array of objects (in this case our book API data), and for each object, examines the propToSeek (in this case the 'shelf' property), and creates/updates the relevant property in the returned object.
		* In this case, the returned object's keys are the shelf names, and the array values for each key are populated by objects for each book that belongs to that shelf.
	*/
	groupBy = (myArray, propToSeek) => {
		const groupedData = {}
		myArray.map((item) => {
			let prop = item[propToSeek]
			!groupedData[prop] && (groupedData[prop] = [])
			groupedData[prop].push(item)
		});
		return groupedData;
	}

	/*
		* Ciphen off books into individual shelves (itemsByCategory)
		* Then grab all the different shelf titles, and for each one, return UI for that shelf title
		* Each Shelf component created will go on to request the UI for each Book component that appears on the Shelf
	*/
	renderList = (data, category) => {
			const itemsByCategory = this.groupBy(data, category)
			const categories = Object.keys(itemsByCategory)
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
	}

	render() {

		const { books, dataLoading, errorMessage } = this.props

		return (
			<div>
				<div className='list-books'>
					<div className='list-books-title'>
					  <h1>MyReads</h1>
					</div>
					{errorMessage.length > 0 && (
						<div className="error">
							<h3 className="error__header">{errorMessage}</h3>
							<img className="error__logo" src={errorImage} width="150" alt="Error"/>
						</div>
	        )}
					{(dataLoading && errorMessage.length === 0) &&(
						<div className="loading">
							<h3 className="loading__header">Retrieving books...</h3>
							<img className="loading__logo" src={loadingImage} width="150" alt="Loading"/>
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

export default ListBooks