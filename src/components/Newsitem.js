import React, { Component } from 'react'

export class Newsitem extends Component { 
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div>
          <div className="card">
            <div  style={{position: 'absolute'}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
            </div>
                <img src={!imageUrl?"https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/ebpqduahzlkecgih_1688732755.jpeg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">{title}....</h5>
                  <p className="card-text">{description}...</p>
                  <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                  <a rel="noreferrer" href = {newsUrl} target='_blank' className='btn btn-primary btn-sm'>Read Me</a>
                </div>
            </div>
      </div>
    )
  }
}

export default Newsitem
