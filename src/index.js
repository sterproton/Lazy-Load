// import React from 'react'
import reactDom from 'react-dom'
import App from './components/App'

const appEle = document.getElementById('app')
if (module.hot) {
  reactDom.unmountComponentAtNode(appEle)
  module.hot.accept()
}

reactDom.render(App, appEle)
