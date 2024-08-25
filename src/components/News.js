import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 16,
    category: 'general'
  }

  static propTypes = { 
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,  // Added PropTypes for apiKey
    setProgress: PropTypes.func.isRequired  // Assuming setProgress is passed as a prop
  }

  constructor() {
    super();
    this.state = {
      article: [],
      loading: true,
      page: 1
    }
  }

  updateNews = async () => {
    this.props.setProgress(0);
    const { country, category, apiKey, pageSize } = this.props;
    const { page } = this.state;

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    
    this.props.setProgress(20);
    let data = await fetch(url);
    
    this.props.setProgress(40);
    let parseData = await data.json();
    
    this.props.setProgress(70);
    this.setState({
      article: parseData.articles,
      totalarticle: parseData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handleNextClick = async () => {
  //   this.setState((prevState) => ({
  //     page: prevState.page + 1
  //   }), this.updateNews);  // Callback ensures updateNews is called after setState
  // }

  // handlePreviousClick = async () => {
  //   this.setState((prevState) => ({
  //     page: prevState.page - 1
  //   }), this.updateNews);  // Callback ensures updateNews is called after setState
  // }

  fetchMoreData = async () => {
    const { country, category, apiKey, pageSize } = this.props;
    const { page } = this.state;
  
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;
    
    try {
      let response = await fetch(url);
      
      // Check if the response status is OK (200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      let data = await response.json();
      this.setState((prevState) => ({
        article: prevState.article.concat(data.articles),
        totalarticle: data.totalResults,
        page: prevState.page + 1
      }));
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Optionally, update the state to show an error message to the user
    }
  };

 























  render() {
    return (
      <>
        <h1 className="text-center">NewsMonkey - Top {this.props.category} Headlines....</h1>
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalarticle}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.article && this.state.article.length > 0 ? (
                this.state.article.map((element) => {
                  return (
                    <div className="col-md-3 my-3" key={element.url}>
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
    );
  }
}

export default News;
