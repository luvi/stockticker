import React, { Component } from "react";
import "./App.css";


let STOCK = "TSLA";
var url = `/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${STOCK}`;

const stockPriceStyle = {
  fontSize: "200px",
};
const stockStatsStyle = {
  fontSize: "20px",
};
const marketPriceStylePositive = {
  color: "green",
};

const marketPriceStyleNegative = {
  color: "red",
};

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
    };
  }


  update = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((data) => {
       
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
        } = obj;

        this.setState({ stockPrice: regularMarketPrice });
        this.setState({ marketDayHigh: regularMarketDayHigh });
        this.setState({ fiftyTwoWeekHigh: fiftyTwoWeekHigh });
        this.setState({ regularMarketVolume: regularMarketVolume });
        this.setState({ regularMarketChange: regularMarketChange });
        this.setState({
          regularMarketChangePercent: regularMarketChangePercent,
          marketState: marketState,
          marketCap: marketCap,
          postMarketChange,
          postMarketChangePercent,
          postMarketPrice,
        });
      });
  };

  componentDidMount() {
    //setInterval(this.update.bind(this), 10000);
    this.update()
  }

  render() {
    // let stylePrice =
    //   (parseInt(this.state.regularMarketChange) < 0 || parseInt(this.state.regularMarketChange) === -0)
    //     ? marketPriceStyleNegative
    //     : marketPriceStylePositive;

    let stylePricePostMarket =
    (parseInt(this.state.postMarketChange) < 0 || parseInt(this.state.postMarketChange) === -0)
        ? marketPriceStyleNegative
        : marketPriceStylePositive;
    return (
      <div className="App">
        <h6>TSLA</h6>
        <table width={"100%"} height={"60%"}>
          <tbody>
            <tr>
              <th rowSpan="2">
                <div style={stockPriceStyle}>${this.state.stockPrice}</div>
              </th>
              <td>
                <div style={stockStatsStyle}>
                  {this.state.regularMarketChangePercent}%
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div style={stockStatsStyle}>
                  ${this.state.regularMarketChange}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          Market Day High: {this.state.marketDayHigh} 52 Week High:{" "}
          {this.state.fiftyTwoWeekHigh} Volume: {this.state.regularMarketVolume}{" "}
          MarketCap: {this.state.marketCap}
        </p>

        <p>Market is {this.state.marketState}</p>
        {this.state.marketState === "OPEN" ? null : (
          <div>
            <p>
              Post Market:{" "}
              
                <h3 style={stylePricePostMarket}>${this.state.postMarketPrice} </h3>{" "}
              
              ${this.state.postMarketChange}{" "}
              {this.state.postMarketChangePercent}%
            </p>
          </div>
        )}
      </div>
    );
  }
}
