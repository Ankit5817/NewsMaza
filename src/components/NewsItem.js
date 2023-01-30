import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, imgUrl, readMore, description, author, time, source } = this.props;

    let a = new Date(`${time}`);
    let d = a.toGMTString();
    return (
      <div className="card" style={{ width: "17rem" }}>
        <span style={{position:'absolute', right:'0',top:'-10px'}}className=" badge rounded-pill bg-danger">
          {source}
        </span>
        <img src={imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <small className="text-muted">
              By {author === null ? "Unknown" : author} on {d}
            </small>
          </p>
          <p className="card-text">{description}</p>
          <a href={readMore} className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
