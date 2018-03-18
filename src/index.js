import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App'

/*
*	Wrapping my App in React Router's BrowserRouter component
*	BrowserRouter listens to changes in my App's URL and will notify other components when the URL does change
*/
ReactDOM.render(
	<BrowserRouter><App /></BrowserRouter>,
	document.getElementById('root')
);
