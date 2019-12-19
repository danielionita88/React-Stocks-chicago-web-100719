import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor(){
    super()
    this.state={
      stocks: [],
      portofolio: [],
      filter: "All",
      sortedAlphabetically: false,
      sortedByPrice: false
    }
  }


  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(stocksData => {
      this.setState({
        stocks: stocksData,
      })
    })
  }

  handleStockClick=(stock)=>{
    if(!this.state.portofolio.includes(stock)){
      this.setState({
        portofolio:[...this.state.portofolio, stock]
      })
    }
  }

  handlePortofolioClick=(stock)=>{
    const newPortofolio=this.state.portofolio.filter(p => p.id !== stock.id)
    this.setState({
      portofolio: newPortofolio
    })
  }

  sortAlphabetically=()=>{
    const newStock= this.state.stocks.sort((a,b) => (a.ticker > b.ticker)? 1:-1)
    this.setState({
      stocks: newStock,
      sortedAlphabetically: true,
      sortedByPrice: false
    })
  }

  sortByPrice=()=>{
    const newStock=this.state.stocks.sort((a,b)=> (a.price < b.price)? 1: -1)
    this.setState({
      stocks: newStock,
      sortedAlphabetically: false,
      sortedByPrice: true
    })
  }

  filter=(value)=>{ 
    this.setState({
      filter: value
    })
  }

  filterStocks = () => {
    if (this.state.filter === "All"){
      return this.state.stocks
    } else if(this.state.filter ==='Tech'){
      return this.state.stocks.filter(stock => stock.type === 'Tech')
    } else if(this.state.filter === 'Finance') {
      return this.state.stocks.filter(stock => stock.type === 'Finance')
    } else if(this.state.filter === 'Sportswear'){
      return this.state.stocks.filter(stock => stock.type === 'Sportswear')
    }
  }

  render() {
    return (
      <div>
        <SearchBar sortAlphabetically={this.sortAlphabetically}
                   sortByPrice={this.sortByPrice}
                   filter={this.filter}
                   sortedAlphabetically={this.state.sortedAlphabetically}
                   sortedByPrice={this.state.sortedByPrice}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.filterStocks()}
              handleStockClick={this.handleStockClick}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portofolio={this.state.portofolio}
              handlePortofolioClick={this.handlePortofolioClick}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
