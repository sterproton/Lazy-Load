import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import ArticleStore from './ArticleStore'
import Header from './Header/Header'
import '../assets/scss/global.scss'
import '../assets/scss/index.scss'


class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Route exact path={['/', '/jobs', '/ask', '/new', '/show']} render={props => <ArticleStore {...props} />} />
      </div>
    )
  }
}

export default App
