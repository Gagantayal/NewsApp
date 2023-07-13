import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


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
      loading:true,
      page:1
    }
  } 
  updateNews=  async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3dcef5da1ef040f5b5fbb4c17fe4811b&page=${this.state.page}&pageSize=${this.props.pageSize}`
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
 fetchMoreData = async()=>{
  this.setState({page:this.state.page + 1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3dcef5da1ef040f5b5fbb4c17fe4811b&page=${this.state.page}&pageSize=${this.props.pageSize}`
  let data = await fetch(url);
  let parseData = await data.json()
  console.log(parseData)
  this.setState({
    article:this.state.article.concat(parseData.articles), 
    totalarticle:parseData.totalResults
  })
 }

  render() {
    return (
      <>
      <h1 className="text-center">NewsMonkey - Top {this.props.category} Headlines....</h1>
      {/* {this.state.loading && <Spinner/>}  */}
      <InfiniteScroll
          dataLength={this.state.article.length} 
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalarticle}
          loader={<Spinner/>}
        >
         <div className="container"> 
        <div className='row'>
          {this.state.article.map((element)=>{
            return <div className='col-md-3 my-3' key={element.url}>
             <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,70):""} 
             imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} 
             source={element.source.name}/>
            </div>
          })}
      </div>
      </div> 
      </InfiniteScroll> 

    </>
    )
  }
}
export default News
