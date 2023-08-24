import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

export default class App extends Component {
apiKey = '3dcef5da1ef040f5b5fbb4c17fe4811b'
  //process.env.REACT_APP_NEWS_API
  state={  
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
 
  render() {
    return ( 
      <div>
        <BrowserRouter> 
        <Navbar/> 
        <LoadingBar
        height={3}  
        color='#f11946'
        progress={this.state.progress}
      /> 
        <Routes>
        <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={16} country="in" category="general"/>} />
        <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={16} country="in" category="business"/>} />
        <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={16} country="in" category="entertainment"/>} />
        <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={16} country="in" category="health"/>} />
        <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={16} country="in" category="sports"/>} />
        <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={16} country="in" category="science"/>} />
        <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={16} country="in" category="technology"/>} />
        <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={16} country="in" category="general"/>} />
      </Routes>
        </BrowserRouter>
      </div>
    )  
  } 
}

