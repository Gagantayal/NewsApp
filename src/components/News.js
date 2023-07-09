import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';

export class News extends Component {
  constructor(){
    super();
    this.state= {
      article:[],
      loading:false,
      page:1
    }
  } 

 async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3dcef5da1ef040f5b5fbb4c17fe4811b&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData)
    this.setState({article:parseData.articles, 
      totalarticle:parseData.totalResults,
      loading:false
    })

 }

 handleNextClick= async()=>{
  if(!(this.state.page + 1 > Math.ceil(this.state.totalarticle/this.props.pageSize))){}
  let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3dcef5da1ef040f5b5fbb4c17fe4811b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
  this.setState({loading:true});
  let data = await fetch(url);
  let parseData = await data.json()
  this.setState({
    page:this.state.page + 1,
    article:parseData.articles,
    loading:false
  })
 }
 handlePreviousclick=async()=>{
  let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3dcef5da1ef040f5b5fbb4c17fe4811b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
  this.setState({loading:true});
  let data = await fetch(url);
  let parseData = await data.json()
  console.log(parseData)
  this.setState({
    page:this.state.page - 1,
    article:parseData.articles,
    loading:false
  })
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
             <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
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
