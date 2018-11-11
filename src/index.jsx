import React from 'react'
import reactDom from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import App from './components/App'

const appEle = document.getElementById('app')
if (module.hot) {
  reactDom.unmountComponentAtNode(appEle)
  module.hot.accept()
}
reactDom.render(
  <Router>
    <App />
  </Router>,
  appEle)
