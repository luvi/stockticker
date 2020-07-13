import React, { Component } from "react";
import "./App.css";
import milify from "millify";

let STOCK = "TSLA";
var url = `/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${STOCK}`;

const stockPriceStylePositive = {
  fontSize: "200px",color: "#0dbf3c"
};

const stockPriceStyleNegative = {
  fontSize: "200px",color: "red"

}

const stockStatsStyle = {
  fontSize: "20px",
};
const marketPriceStylePositive = {
  color: "#0dbf3c",
};

const marketPriceStyleNegative = {
  color: "red",
};

let stylePricePostMarket = {

}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockPrice: 0,
      marketDayHigh: 0,
      fiftyTwoWeekHigh: 0,
      regularMarketVolume: 0,
      regularMarketChange: 420,
      regularMarketChangePercent: 69,
      marketState: "",
      marketCap: 0,
      postMarketChange: 0,
      postMarketChangePercent: 0,
      postMarketPrice: 0,
      preMarketChange: 0 ,
          preMarketChangePercent:0 ,
          preMarketPrice:0 ,
    };
  }

  update = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let obj = data.quoteResponse.result[0];
        console.log(obj);

        let {
          regularMarketPrice,
          regularMarketDayHigh,
          fiftyTwoWeekHigh,
          regularMarketVolume,
          regularMarketChange,
          regularMarketChangePercent,
          marketState,
          marketCap,
          postMarketChange,
          postMarketChangePercent,
          postMarketPrice,
          preMarketChange,
          preMarketChangePercent,
          preMarketPrice,
        } = obj;

        this.setState({
          stockPrice: regularMarketPrice,
          marketDayHigh: regularMarketDayHigh,
          fiftyTwoWeekHigh,
          regularMarketVolume,
          regularMarketChange,
          regularMarketChangePercent,
          marketState,
          marketCap,
          postMarketChange,
          postMarketChangePercent,
          postMarketPrice,preMarketChange,
          preMarketChangePercent,
          preMarketPrice,
        });
      });
  };

  timer = 10000;

  componentDidMount() {
    this.update(); // update immediately once open
    setInterval(this.update.bind(this), this.timer);
  }

  render() {
    let stylePrice =
      (parseInt(this.state.regularMarketChange) < 0 || parseInt(this.state.regularMarketChange) === -0)
        ? stockPriceStyleNegative
        : stockPriceStylePositive;
    let postMarketChangeInt = parseInt(this.state.postMarketChange);
    if (postMarketChangeInt !== undefined) {
    stylePricePostMarket =
      postMarketChangeInt < 0 ||
      postMarketChangeInt === -0
        ? marketPriceStyleNegative
        : marketPriceStylePositive;
    }
    return (
      <div className="App" >
        <h6>TSLA</h6>
        <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center", borderRadius:"1", borderColor:"red"}}>
        <table width={"60%"} height={"60%"} style={{justifySelf:"center",alignItems:"center", alignSelf:"center"}}>
          <tbody>
            <tr>
              <th rowSpan="2">
                <div style={stylePrice}>{this.state.stockPrice.toFixed(2)}</div>
              </th>
              <td>
                <div style={stockStatsStyle}>
                  {this.state.regularMarketChangePercent.toFixed(2)}%
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={stockStatsStyle}>
                  ${this.state.regularMarketChange.toFixed(2)}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>

        <p>
          Market Day High: {this.state.marketDayHigh.toFixed(2)} 52 Week High:{" "}
          {this.state.fiftyTwoWeekHigh} Volume:{" "}
          {milify(this.state.regularMarketVolume)} Market Cap:{" "}
          {milify(this.state.marketCap)}
        </p>

        <p>{this.state.marketState} Market</p>
        {this.state.marketState === "POST" ? (
          <div>
            <p>
              Post Market:{" "}
              <h3 style={stylePricePostMarket}>
                ${this.state.postMarketPrice}{" "}
              </h3>{" "}
              ${this.state.postMarketChange !== undefined ? this.state.postMarketChange.toFixed(2) :null }{" "}
              {this.state.postMarketChangePercent !== undefined ? this.state.postMarketChangePercent.toFixed(2) :null}%
            </p>
          </div>
        ): null }

{this.state.marketState === "PRE" ? (
          <div>
            <p>
              Pre Market:{" "}
              <h3 style={stylePricePostMarket}>
                ${this.state.preMarketPrice.toFixed(2)}{" "}
              </h3>{" "}
              ${this.state.preMarketChange !== undefined ? this.state.preMarketChange.toFixed(2) :null }{" "}
              {this.state.preMarketChangePercent !== undefined ? this.state.preMarketChangePercent.toFixed(2) :null}%
            </p>
          </div>
        ): null }
      </div>
    );
  }
}
