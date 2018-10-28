import React, { Component } from 'react'
import ArticleContainer from './ArticleContainer/ArticleContainer'
import Header from './Header/Header'
import '../assets/scss/global.scss'
import '../assets/scss/index.scss'

class App extends Component {
  render() {
    return (
      <div className="reactAPP">
        <Header />
        <ArticleContainer />
      </div>
    )
  }
}

export default <App />
