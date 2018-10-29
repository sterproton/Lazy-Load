import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ArticleContainer from './ArticleContainer/ArticleContainer'
import Header from './Header/Header'
import '../assets/scss/global.scss'
import '../assets/scss/index.scss'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <ArticleContainer />
        </div>
        
      </Router>
    )
  }
}

export default App
