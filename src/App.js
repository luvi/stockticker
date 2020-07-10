import React, { Component } from "react";
import './App.css';

let STOCK = "TSLA";
var url = `https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${STOCK}`;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      stockPrice: 0,
      marketDayHigh: 0,
      fiftyTwoWeekHigh: 0,
      regularMarketVolume: 0
    }
  }

  update = () => {
    fetch('https://cors-anywhere.herokuapp.com/'+url)
      .then((response) => response.json())
      .then((data) => {

        let obj = data.quoteResponse.result[0]
        this.setState({stockPrice: obj.regularMarketPrice})
        this.setState({marketDayHigh: obj.regularMarketDayHigh})
        this.setState({fiftyTwoWeekHigh: obj.fiftyTwoWeekHigh})
        this.setState({regularMarketVolume: obj.regularMarketVolume})
   
      });

  }
  
  componentDidMount(){

    setInterval(this.update.bind(this), 3000);
    
  }

  render(){
  return (
    <div className="App">
      <h1>TSLA Stock Price</h1>
      <h2>{this.state.stockPrice}</h2>
      <p>Market Day High: {this.state.marketDayHigh}</p>
      <p>52 Week High: {this.state.fiftyTwoWeekHigh}</p>
      <p>Volume: {this.state.regularMarketVolume}</p>
    </div>
  );
  }
}