import React, { Component } from 'react'
import Newsitem from './Newsitem';

export class News extends Component {
  article = [{"source":{"id":"talksport","name":"TalkSport"},"author":"Callum Vurley","title":"Australia demand MCC investigate incidents involving Ashes spectators in Lord’s Long Room with Usman K...","description":"Cricket Australian management has demanded Marylebone Cricket Club (MCC) investigate several incidents involving members and players. Usman Khawaja and David Warner were involved in altercations in…","url":"https://talksport.com/sport/cricket/1485865/australia-mcc-investigate-ashes-spectators-lords-usman-khawaja-david-warner/","urlToImage":"https://talksport.com/wp-content/uploads/sites/5/2023/07/VideoScreenshot-1longroom-TwitterSearchTwitter-013.png?strip=all&quality=100&w=1280&h=720&crop=1","publishedAt":"2023-07-02T14:36:43Z","content":"Cricket Australian management has demanded Marylebone Cricket Club (MCC) investigate several incidents involving members and players.\r\nUsman Khawaja and David Warner were involved in altercations in … [+1792 chars]"},{"source":{"id":"news-com-au","name":"News.com.au"},"author":"Jai Bednall","title":"Stump mic picks up wild Broad sledge","description":"Trevor Chappell has some competition for the most controversial underarm throw in cricket history.","url":"https://www.news.com.au/sport/cricket/stump-mic-picks-up-wild-stuart-broad-sledge-at-alex-carey/news-story/0833de8a4f2ed0ae07fd0f5b715b3d3b","urlToImage":"https://content.api.news/v3/images/bin/92072d2e01ef46b82ee34a255aa3bf10","publishedAt":"2023-07-02T13:15:00Z","content":"Trevor Chappell has some competition for the most controversial underarm throw in cricket history.\r\nJust when you thought this Ashes series couldn’t get any spicier, Jonny Bairstow wandered out of hi… [+2098 chars]"},{"source":{"id":"espn-cric-info","name":"ESPN Cric Info"},"author":null,"title":"PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com","description":"Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com","url":"http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket","urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg","publishedAt":"2020-04-27T11:41:47Z","content":"Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"},{"source":{"id":"espn-cric-info","name":"ESPN Cric Info"},"author":null,"title":"What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com","description":"Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com","url":"http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again","urlToImage":"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg","publishedAt":"2020-03-30T15:26:05Z","content":"Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"}]
  constructor(){
    super();
    this.state={
      article:this.article
    }
  }
  render() {
    return (
      <>

    <div className='container my-3'>
    <h1>NewsMonkey - top Headlines....</h1>
        <div className='row'>
          {this.state.article.map((element)=>{
            return <div className='col-md-4 my-3' key={element.url}>
             <Newsitem title={element.title.slice(0,45)} description={element.description.slice(0,88)} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
      </div>
    </div>
    </>
    )
  }
}

export default News
