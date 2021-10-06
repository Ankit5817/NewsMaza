import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./NewsComponent.css";
import InfiniteScroll from "react-infinite-scroll-component";


// d61306897ca14b85ab352fa1430fa477

export class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0,
    };
    document.title = `NewsMaza - ${this.capitalize(props.category)}`
  }

  async componentDidMount() {
    this.props.progress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=d61306897ca14b85ab352fa1430fa477&pageSize=6&page=1`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.progress(30)
    let parsedData = await data.json();
    this.props.progress(70)
    // console.log(parsedData);
    this.setState({ articles: parsedData.articles ,
      loading: false,});
      this.props.progress(100)
  }

  nextPage = async () => {
    console.log("next page");
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f628a87d4ff64a8db9090fd892c063fd&pageSize=6&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      nPage: parsedData.totalResults,
      loading: false,
    });
  };

  previousPage = async () => {
    console.log("previous page");
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f628a87d4ff64a8db9090fd892c063fd&pageSize=6&page=${this.state.page - 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };


  capitalize = (str)=>{
    let s = str;
    str = str.slice(1).toLowerCase();
    s = s.slice(0,1).toUpperCase();
    return s + str;
  }

  fetchMoreData = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=d61306897ca14b85ab352fa1430fa477&pageSize=6&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: this.state.page + 1,
      loading: false
    });
  };
  render() {
    return (
      <div id="newsCompContainer">
        
        <h1 id='head'>
          <u>NewsMaza Top {this.capitalize(this.props.category)} News</u>
        </h1>
    
        {this.state.loading && (
          <img style={{ width: "500px" }} src="./Curve-Loading.gif" alt="" />
        )}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={this.state.loading && (<img style={{ width: "500px" , marginLeft: '300px' }} src="./Curve-Loading.gif" alt="" />)}
        >
        
          <div className="rowIn">
            {this.state.articles.map((element) => {
              return (
                <div key={element.url}>
                  <NewsItem title={element.title} imgUrl={element.urlToImage === null? "./newsLogo.jpg": element.urlToImage} readMore={element.url} description={element.description} author={element.author} time={element.publishedAt} source={element.source.name}/>
                </div>
              );
            })}
          </div>
      
        </InfiniteScroll>
        {/* <div
          className="btn"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "85vw",
          }}
        >
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            onClick={this.previousPage}
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            disabled={this.state.page >= Math.ceil(this.state.nPage / 6)}
            className="btn btn-primary"
            onClick={this.nextPage}
          >
            Next &raquo;
          </button>
        </div> */}
      </div>
    );
  }
}

export default NewsComponent;
