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
    this.props.setProgress(0);
    this.props.setProgress(20);
    console.log(this.props.apiKey)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    this.props.setProgress(40);
    let parseData = await data.json()
    this.props.setProgress(70);
    this.setState({article:parseData.articles, 
      totalarticle:parseData.totalResults,
      loading:false
    })  
    this.props.setProgress(100);  
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
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
   this.setState({page:this.state.page + 1})
  let data = await fetch(url);
  let parseData = await data.json()

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
          {/* {this.state.article.map((element)=>{
            return <div className='col-md-3 my-3' key={element.url}>
             <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,70):""} 
             imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} 
             source={element.source.name}
             />

            </div>
          })} */}
          {this.state.article && this.state.article.length > 0 ? (
    this.state.article.map((element) => {
        return (
            <div className='col-md-3 my-3' key={element.url}>
                <Newsitem
                    title={element.title ? element.title.slice(0, 45) : "No Title Available"}
                    description={element.description ? element.description.slice(0, 70) : "No Description Available"}
                    imageUrl={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"}
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt ? new Date(element.publishedAt).toLocaleDateString() : "Unknown Date"}
                    source={element.source && element.source.name ? element.source.name : "Unknown Source"}
                />
            </div>
        );
    })
) : (
    <div>No articles available</div>
)}

      </div>
      </div> 
      </InfiniteScroll> 

    </>
    )
  }
}
export default News
