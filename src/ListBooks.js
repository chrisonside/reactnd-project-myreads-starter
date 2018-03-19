import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class ListBooks extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		onAddBook: PropTypes.func.isRequired
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
					shelves={categories}
				/>
			))
	}

	render() {

		return (
			<div>
				<div className='list-books'>
					<div className='list-books-title'>
					  <h1>MyReads</h1>
					</div>
					<div className='list-books-content'>
						{this.renderList(this.props.books, `shelf`)}
					</div>
				</div>

				<Link
					to='/search'
					className='open-search'
					>Add a book</Link>
			</div>

		)
	}
}

export default ListBooks