import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:16,
    category:'general'
  }

  static propsType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(){
    super();
    this.state= {
      article:[],
      loading:false,
      page:1
    }
  } 
  updateNews=  async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3dcef5da1ef040f5b5fbb4c17fe4811b&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData)
    this.setState({article:parseData.articles, 
      totalarticle:parseData.totalResults,
      loading:false
    })
  }
 async componentDidMount(){
  this.updateNews()
 }

 handleNextClick= async()=>{
  this.setState({
      page:this.state.page + 1
 })
 this.updateNews()
}
 handlePreviousclick=async()=>{
  this.setState({
    page:this.state.page - 1
  })
  this.updateNews()
 }

  render() {
    return (
      <>

    <div className='container my-3'>
      <h1 className="text-center">NewsMonkey - top Headlines....</h1>
      {this.state.loading && <Spinner/>}
        <div className='row'>
          {!this.state.loading && this.state.article.map((element)=>{
            return <div className='col-md-3 my-3' key={element.url}>
             <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
      </div>
      <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-info"onClick={this.handlePreviousclick}>&larr; Previous</button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalarticle/this.props.pageSize)}type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
    </div>
    </>
    )
  }
}
export default News
