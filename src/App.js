import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>

        <Routes>
        <Route path="/" element={<News key="general" pageSize={16} country="in" category="general"/>} />
        <Route path="/business" element={<News key="business" pageSize={16} country="in" category="business"/>} />
        <Route path="/entertainment" element={<News key="entertainment" pageSize={16} country="in" category="entertainment"/>} />
        <Route path="/health" element={<News key="health" pageSize={16} country="in" category="health"/>} />
        <Route path="/sports" element={<News key="sports" pageSize={16} country="in" category="sports"/>} />
        <Route path="/science" element={<News key="science" pageSize={16} country="in" category="science"/>} />
        <Route path="/technology" element={<News key="technology" pageSize={16} country="in" category="technology"/>} />
        <Route path="/general" element={<News key="general" pageSize={16} country="in" category="general"/>} />
      </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

