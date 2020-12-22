import React, { Component } from "react";
import milify from "millify";
import { Navbar, Jumbotron, Container, Card } from "react-bootstrap";
import InfoCard from './InfoCard'

let STOCK = "TSLA";
var url = `/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${STOCK}`;

const stockPriceStylePositive = {
  fontSize: "240px",
  fontWeight: "200",
  color: "#0dbf3c",
  textAlign: "center",
  background: "none",
  padding: "0px"
};

const stockPriceStyleNegative = {
  fontSize: "240px",
  fontWeight: "300",
  color: "red",
  textAlign: "center",
  background: "none",
  padding: "0px"
};

const stockStatsStyle = {
  fontSize: "20px",
};
const marketPriceStylePositive = {
  color: "#0dbf3c",
};

const marketPriceStyleNegative = {
  color: "red",
};

let stylePricePostMarket = {};

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
      preMarketChange: 0,
      preMarketChangePercent: 0,
      preMarketPrice: 0,
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
          postMarketPrice,
          preMarketChange,
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
      parseInt(this.state.regularMarketChange) < 0 ||
      parseInt(this.state.regularMarketChange) === -0
        ? stockPriceStyleNegative
        : stockPriceStylePositive;

    let postMarketChangeInt = parseInt(this.state.postMarketChange);

    if (postMarketChangeInt !== undefined) {
      stylePricePostMarket =
        postMarketChangeInt < 0 || postMarketChangeInt === -0
          ? marketPriceStyleNegative
          : marketPriceStylePositive;
    }
    return (
      <>
        <Navbar>
          <Navbar.Brand href="#home">Simple Stock Ticker {STOCK}</Navbar.Brand>
        </Navbar>

        <div className="App">
          <Jumbotron fluid style={stylePrice}>
            <Container fluid>
              <div>{this.state.stockPrice.toFixed(2)}</div>
            </Container>

            <div style={stockStatsStyle}>
              {this.state.regularMarketChangePercent.toFixed(2)}%
            </div>
            <div style={stockStatsStyle}>
              ${this.state.regularMarketChange.toFixed(2)}
            </div>
          </Jumbotron>

          <Card>
            <Card.Body style={{fontWeight: "200", fontSize:"30px"}}>
            {this.state.marketState} Market
            </Card.Body>
          </Card>
        <div style={{display:"flex", flexDirection: "row"}}>
          <InfoCard title={"Market Day High"} text={this.state.marketDayHigh.toFixed(2)}></InfoCard>
          <InfoCard title={"52 Week High"} text={this.state.fiftyTwoWeekHigh}></InfoCard>
          <InfoCard title={"Volume"} text={milify(this.state.regularMarketVolume)}></InfoCard>
          <InfoCard title={"Market Cap"} text={milify(this.state.marketCap)}></InfoCard>
        </div>
         
          
          {this.state.marketState === "POST" ? (
            <div>
              <p>
                <h3 style={stylePricePostMarket}>
                  ${this.state.postMarketPrice}{" "}
                </h3>{" "}
                $
                {this.state.postMarketChange !== undefined
                  ? this.state.postMarketChange.toFixed(2)
                  : null}{" "}
                {this.state.postMarketChangePercent !== undefined
                  ? this.state.postMarketChangePercent.toFixed(2)
                  : null}
                %
              </p>
            </div>
          ) : null}

          {this.state.marketState === "PRE" ? (
            <div>
              <p>
                <h3 style={stylePricePostMarket}>
                  ${this.state.preMarketPrice.toFixed(2)}{" "}
                </h3>{" "}
                $
                {this.state.preMarketChange !== undefined
                  ? this.state.preMarketChange.toFixed(2)
                  : null}{" "}
                {this.state.preMarketChangePercent !== undefined
                  ? this.state.preMarketChangePercent.toFixed(2)
                  : null}
                %
              </p>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}
