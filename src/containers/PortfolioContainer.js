import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
           this.props.portofolio.map(stock => <Stock key={stock.id} stock={stock}
                                                      handleStockClick={this.props.handlePortofolioClick}/>)
          }
      </div>
    );
  }

}

export default PortfolioContainer;
