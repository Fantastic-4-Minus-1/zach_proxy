import React from 'react';
import ReactDOM from 'react-dom';
import StickyBox from 'react-sticky-box';
import axios from 'axios';
import moment from 'moment';
import DropDownMenu from './components/DropDownMenu/DropDownMenu.jsx';
import MarketOrder from './components/MarketOrder.jsx';
import LimitOrder from './components/LimitOrder.jsx';
import StopLossOrder from './components/StopLossOrder.jsx';
import StopLimitOrder from './components/StopLimitOrder.jsx';
import defaultData from './defaultData.js';
import PopUp from './components/PopUp.jsx';
import getCompanyName from '../../utils/utils.js';
import './openMarket.css';
import './closedMarket.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'Market',
      companyData: defaultData,
      watchList: 'add',
      showMenu: false,
      total: 0,
      currentPrice: defaultData[0].currentDay[0].currentPrice,
      marketOpen: true,
      priceIsUp: true,
    };
    this.changeView = this.changeView.bind(this);
    this.changeWatch = this.changeWatch.bind(this);
    this.renderWatch = this.renderWatch.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.changeButton = this.changeButton.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    const company = getCompanyName();
    axios.get(`/api/sideBar/${company}`)
      .then((res) => {
        const data = res.data;
        this.setState({
          companyData: data,
        });
        this.changeCurrentPrice();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  changeCurrentPrice() {
    const { companyData, marketOpen, currentPrice } = this.state;
    const variable = this;
    function theLoop(i) {
      setTimeout(() => {
        const time = moment();
        const isOpen = moment('9:00', 'hh:mm');
        const isClosed = moment('15:00', 'hh:mm');
        const marketOpen = (time.isBetween(isOpen, isClosed));
        const priceIsUp = (currentPrice > companyData[0].currentDay[i].currentPrice);
        variable.setState({
          currentPrice: companyData[0].currentDay[i].currentPrice,
          marketOpen,
          priceIsUp,
        });
        if (++i) {
          theLoop(i);
        }
      }, 1000);
    }
    theLoop(0);
  }


  onChangeHandler(e) {
    const { companyData, currentPrice } = this.state;
    const results = eval(currentPrice * parseFloat(e.target.value));
    this.setState({
      total: results,
    });
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  changeWatch(option) {
    this.setState({
      watchList: option,
    });
  }


  renderPopup() {
    const {
      view, companyData, showMenu, total, currentPrice, marketOpen, priceIsUp,
    } = this.state;
    return (
      <PopUp
        view={view}
        marketOpen={marketOpen}
        currentPrice={currentPrice}
        priceIsUp={priceIsUp}
      />
    );
  }

  renderWatch() {
    const { watchList, marketOpen, priceIsUp } = this.state;
    const className = marketOpen ? 'Opened' : 'Closed';
    const price = priceIsUp ? 'Up' : 'Down';
    if (watchList === 'add') {
      return <button className={`watchList${className} watchPrice${price}`} onClick={() => { this.changeWatch('remove'); }}> Add to Watchlist </button>;
    }
    return <button className={`watchList${className} watchPrice${price}`} onClick={() => { this.changeWatch('add'); }}> Remove from Watchlist </button>;
  }

  renderView() {
    const {
      view, companyData, showMenu, total, currentPrice, marketOpen, priceIsUp,
    } = this.state;
    const popup = this.renderPopup.call(this);
    let component = null;
    switch (view) {
      case 'Market':
        component = (
          <MarketOrder
            popup={popup}
            companies={companyData}
            renderWatch={this.renderWatch}
            changeButton={this.changeButton}
            total={total}
            onChangeHandler={this.onChangeHandler}
            currentPrice={currentPrice}
            marketOpen={marketOpen}
          />
        );
        break;
      case 'Limit':
        component = (
          <LimitOrder
            popup={popup}
            companies={companyData}
            renderWatch={this.renderWatch}
            changeButton={this.changeButton}
            total={total}
            onChangeHandler={this.onChangeHandler}
            currentPrice={currentPrice}
            marketOpen={marketOpen}
          />
        );
        break;
      case 'Stop':
        component = (
          <StopLossOrder
            popup={popup}
            companies={companyData}
            renderWatch={this.renderWatch}
            changeButton={this.changeButton}
            total={total}
            onChangeHandler={this.onChangeHandler}
            currentPrice={currentPrice}
            marketOpen={marketOpen}
          />
        );
        break;
      default:
        component = (
          <StopLimitOrder
            popup={popup}
            companies={companyData}
            renderWatch={this.renderWatch}
            changeButton={this.changeButton}
            total={total}
            onChangeHandler={this.onChangeHandler}
            currentPrice={currentPrice}
            marketOpen={marketOpen}
          />
        );
        break;

    }
    const className= marketOpen ? 'Opened' : 'Closed';
    return (
      <div>
        <div>
          <div className={"mainMenu"+className}>
            <header className={"header-class"+className}> Buy {companyData[0].company}</header>
            <div className={"menuBody"+className}>
              {component}
              {this.changeButton()}
            </div>
          </div>
          <div className={"footerclass"+className}> $0.00 Buying Power Available </div>
        </div>
        <div>
          {this.renderWatch()}
        </div>
      </div>
    )
  }


  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true });
  }

  closeMenu(event) {
    if (!this.slideDown.contains(event.target)) {
      this.setState({ showMenu: false });
    }
  }

  changeButton() {
    const {
      showMenu, total, companyData, currentPrice, marketOpen, priceIsUp,
    } = this.state;
    const numOfShare = Math.floor(total / currentPrice);
    const className = marketOpen ? 'Opened' : 'Closed';
    const price = priceIsUp ? 'Up' : 'Down';
    if (total === 0 || NaN) {
      if (showMenu === false) {
        return (
          <div>
            <div className={`checkOut${className}`}>
              {showMenu ? (<div
                className={`slideDown${className}`}
                ref={(element) => {
                  this.slideDown = element;
                }}
              />
              ) : (null)
              }
            </div>
            <button className={`button${className} buttonPrice${price}`} onClick={this.showMenu}> Review Order </button>
          </div>
        );
      }
      return (
        <div>
          <div className={`checkOut${className}`}>
            {showMenu ? (<div
              className={`slideDown${className}`}
              ref={(element) => {
                this.slideDown = element;
              }}
            />
            ) : (null)
              }
          </div>
          <div> Error </div>
          <div> Please enter a valid number of shares.</div>
          <br />
          <br />
          <button className={`button${className} buttonPrice${price}`} onClick={this.closeMenu}> Back </button>
        </div>);
    }
    if (showMenu === false) {
      return (
        <div>
          <div className={`checkOut${className}`}>
            {showMenu ? (<div
              className={`slideDown${className}`}
              ref={(element) => {
                this.slideDown = element;
              }}
            />
            ) : (null)
              }
          </div>
          <button className={`button${className} buttonPrice${price}`} onClick={this.showMenu}> Review Order </button>
        </div>);
    }
    return (
      <div>
        <div className={`checkOut${className}`}>
          {showMenu ? (<div
            className={`slideDown${className}`}
            ref={(element) => {
              this.slideDown = element;
            }}
          />
          ) : (null)
              }
        </div>
        <div> Not Enough Buying Power </div>
        <div>
You don’t have enough buying power to buy
          {numOfShare}
          {' '}
share of
          {companyData[0].company}
.
          {' '}
        </div>
        <br />
        <div>
Please deposit $
          {(total * 1.05).toFixed(2)}
          {' '}
to purchase
          {numOfShare}
          {' '}
share at market price (5% collar included).
        </div>
        <br />
        <div>
Market orders on Robinhood are placed as limit orders up to 5% above the market price in order to protect customers
                 from spending more than they have in their Robinhood account.
                 If you want to use your full buying power of $0.00 you can place a limit order instead.
        </div>
        <br />
        <button className={`button${className} buttonPrice${price}`}>
          {' '}
Deposit $
          {parseFloat((total * 1.05).toFixed(2)) || '0.00'}
        </button>
        <button className={`backButton${className}`} onClick={this.closeMenu}> Back </button>
      </div>
    );
  }

  render() {
    const { marketOpen } = this.state;
    const className = marketOpen ? 'Opened' : 'Closed';
    return (
      <div className={`component-container${className}`} id="navigationBar">
        <div className={`content-sidebar${className}`}>
          <DropDownMenu handleClick={this.changeView} marketOpen={marketOpen} />
          {this.renderView()}
        </div>
      </div>
    );
  }
}
// window.navigationBar = App;
ReactDOM.render(<App />, document.getElementById('navigationBar'));
