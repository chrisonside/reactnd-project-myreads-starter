
# MyReads Project

This is a project completed as part of the [Udacity React Nanodegree](https://eu.udacity.com/course/react-nanodegree--nd019).

This React project uses [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## Summary

This is a bookshelf app which allows you to select and categorise books into different book shelves - **read**, **currently reading** and **want to read**. You can also search the client library to add new books to your shelves.

The project provides an API server and client library - methods for interacting with the API are detailed below and are used in the code to ensure that your book shelf choices are updated and stored across your interactions with the app.

There are several efforts made to improve the user experience, such as:

* displaying a loading icon whilst data is being retrieved from the client library
* displaying an error message if the app can't retrieve data from the client library
* waiting for the user to stop typing before handling their search query
* using colour to give the user a gentle visual nudge when their search term isn't included in the approved list

## To install and launch the app:

* You'll need to have [Node.js](https://nodejs.org/en/download/) and [NPM](https://www.npmjs.com/) installed on your computer to start the app.
* First you need to clone [this project](https://github.com/chrisonside/reactnd-project-myreads-starter) from Github:

    `git clone https://github.com/chrisonside/reactnd-project-myreads-starter`

* Now you've cloned the project, simply `cd` into the project directory and run `npm install` to install the dev dependencies.
* Now you can start the development server with `npm start`


## Backend Server

To simplify the development process, Udacity have provided a backend server to develop against. The provided file [`BooksAPI.js`](src/utils/BooksAPI.js) contains the methods you needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend.

## TODO

The next steps for the app are detailed in the [issues section of the GitHub repo](https://github.com/chrisonside/reactnd-project-myreads-starter/issues).