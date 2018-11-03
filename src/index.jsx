import React from 'react'
import reactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App1'

const appEle = document.getElementById('app')
if (module.hot) {
  reactDom.unmountComponentAtNode(appEle)
  module.hot.accept()
}
reactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  appEle)
