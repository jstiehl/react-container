import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './App'

render(<App />, document.getElementById('main'))

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept()
}