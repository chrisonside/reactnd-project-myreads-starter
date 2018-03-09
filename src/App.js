import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
  }

  render() {
    return (
      <div className="app">

        {/* Update UI based on the URL, using React Router's <Route> tag */}
        <Route exact path='/' render={() => (
          <ListBooks/>
        )}/>

        <Route path='/search' render={() => (
          <SearchBooks/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
