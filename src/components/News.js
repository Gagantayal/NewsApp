import React, { Component } from 'react'
import Newsitem from './Newsitem';

export class News extends Component {
  constructor(){
    super();
    this.state= {
      article:[],
      loading:false
    }
  }

 async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=3dcef5da1ef040f5b5fbb4c17fe4811b"
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData)
    this.setState({article:parseData.articles})

 }

  render() {
    return (
      <>

    <div className='container my-3'>
    <h1>NewsMonkey - top Headlines....</h1>
        <div className='row'>
          {this.state.article.map((element)=>{
            return <div className='col-md-3 my-3' key={element.url}>
             <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
      </div>
    </div>
    </>
    )
  }
}

export default News
