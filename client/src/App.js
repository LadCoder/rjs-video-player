import React from 'react'
import {
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom"
import Home from './pages/Home'
import Player from './pages/Player'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

export default function App() {
    return ( 
      <div className="App App-header">
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/player/:id" component={Player}></Route>
          </Switch>
        </Router>
        <Footer/>
      </div>
    )
}
