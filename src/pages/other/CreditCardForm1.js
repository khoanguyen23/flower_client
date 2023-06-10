import React from 'react'

import MyAccountService from '../../services/MyAccountService';

//TODO: Add components prop-types, add Cvc animation

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth();
let MONTHS = {},
  YEARS = [CURRENT_YEAR];
for (let i = 1; i <= 12; i++) {
  MONTHS[i] = i.toString().length === 1 ? `0${i}` : i.toString();
  YEARS.push(YEARS[0] + i);
}

class CreditCardForm extends React.Component {
  state = {
    sliderLocation: "",
    cardNumber: "0000000000",
    cardName: "00000000",
    expiryMonth: 0,
    expiryYear: 0,
    cvc: "",
    cardType: "visa",
    toggleMonth: true,
    toggleYear: true,
    showCard: false,
    cardFlipped: false, 
    defaultPayment: true,
  };

  handleChange = (event, type) => {
    let { value } = event.target;

    if (type === "cardNumber") {
      value = value.replace(/ /gi, "");
      if (isNaN(value)) {
        return;
      } else {
        const cardType = this.getCardType(value);
        this.setState({ [type]: value, cardType });
      }
    } else if (type === "cardName") {
      var regName = /^[a-zA-Z\s]*$/;
      if (!regName.test(value)) {
      } else {
        this.setState({ [type]: value });
      }
    } else if (type === "expiryMonth") {
      value = Number(value);
      this.setState(prevState => ({
        [type]: value,
        toggleMonth: !prevState.toggleMonth
      }));
    } else if (type === "expiryYear") {
      value = Number(value);
      const { expiryMonth } = this.state;
      if (value === CURRENT_YEAR && expiryMonth <= CURRENT_MONTH) {
        this.setState(prevState => ({
          expiryMonth: 0,
          expiryYear: value,
          toggleYear: !prevState.toggleYear,
          toggleMonth: !prevState.toggleMonth
        }));
      } else {
        this.setState(prevState => ({
          [type]: value,
          toggleYear: !prevState.toggleYear
        }));
      }
    } else if (type === "cvc") {
      value = value.replace(/ /gi, "");
      if (isNaN(value)) {
        return;
      } else {
        this.setState({ [type]: value });
      }
    }
  };
  
  handleSubmit = event => {
    event.preventDefault();
    const {
      cardNumber,
      cardName,
      expiryMonth,
      expiryYear,
      cvc,
      cardType,defaultPayment
    } = this.state;
    console.log(this.state)
  
    // Gọi hàm setUserPayment từ MyAccountService
    MyAccountService.setUserPayment(
      cardNumber,
      cardName,
      expiryMonth,
      expiryYear,
      cvc,
      cardType,defaultPayment
    )
      .then(function(response) {
        // Xử lý kết quả trả về ở đây
        window.location.reload();
        return response.json();
      })
      .catch(function(error) {
        // Xử lý lỗi ở đây
        console.error(error);
      });
  };
  
    
   
  

  canSubmit = () => {
    const { cardNumber, cardName, expiryMonth, expiryYear, cvc } = this.state;

    return (
      cardNumber.length === 16 &&
      cardName.length > 4 &&
      cvc.length === 3 &&
      expiryMonth !== 0 &&
      expiryYear !== 0
    );
  };

  moveSlider = (event, position) => {
    position = ["year", "month"].includes(position) ? "expiration" : position;
    this.setState({ sliderLocation: position });
  };

  setFocus = (event, type) => {
    let { sliderLocation } = this.state;

    if (event.target.className.includes("year")) {
      event.stopPropagation();
    }
    this[`${type}Input`].focus();
  };

  handleClick = event => {
    if (!this.CvcInput.contains(event.target)) {
      this.setState({ cardFlipped: false });
    }
    if (
      this.nameCard.contains(event.target) ||
      this.nameInput.contains(event.target) ||
      this.numberCard.contains(event.target) ||
      this.numberInput.contains(event.target) ||
      this.expirationCard.contains(event.target) ||
      this.monthInput.contains(event.target) ||
      this.yearInput.contains(event.target)
    )
      return;
    this.setState({ sliderLocation: "" });
  };

  // HELPERS
  formatCardNumber = value => {
    let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  getCardType = number => {
    let re = new RegExp("^4");
    if (number.match(re) != null) return "visa";
    re = new RegExp("^(34|37)");
    if (number.match(re) != null) return "amex";
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) return "mastercard";
    re = new RegExp("^6011");
    if (number.match(re) != null) return "discover";
    return "visa";
  };

 

  render() {
    // console.log("RENDERING ", this.state);
    const {
      cardNumber,
      cardName,
      expiryMonth,
      expiryYear,
      cvc,
      cardType,
      sliderLocation,
      toggleMonth,
      toggleYear,
      showCard,
      cardFlipped
    } = this.state;

    let displayNumber = [];

    for (let i = 0; i < 16; i++) {
      let displayDigit = "#";
      if (typeof cardNumber[i] !== "undefined") {
        displayDigit = i > 3 && i < 12 ? "*" : cardNumber[i];
      }
      displayNumber.push(displayDigit);
    }

    const canSubmit = !this.canSubmit();

    return (
      <div className="creditcard-form" onClick={this.handleClick}>
        <div className={`creditcard container ${showCard ? "show" : ""}`}>
          <div className={`creditcard inner ${cardFlipped ? "flipped" : ""}`}>
            <div className="front">
              <img
                className="creditcard cover"
                src="https://source.unsplash.com/collection/8497941/430x270"
                onLoad={() => this.setState({ showCard: true })}
              />
              <div className="creditcard overlay" />
              <div
                className={`creditcard slider ${
                  sliderLocation.length > 0 ? `on-${sliderLocation}` : ""
                }`}
              />
              <div className="creditcard content">
                <div className="chip" />
                <div className={`type ${cardType}`} />
                <div
                  className="number"
                  onClick={event => this.setFocus(event, "number")}
                  ref={node => (this.numberCard = node)}
                >
                  {displayNumber.map((digit, index) => (
                    <div className="digit-wrapper" key={index}>
                      <div
                        className={
                          digit === "#" ? "digit shown" : "digit hidden"
                        }
                      >
                        #
                      </div>
                      <div
                        className={
                          digit === "#" ? "digit hidden" : "digit shown"
                        }
                      >
                        {digit === "#" ? "" : digit}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="creditcard-name-exp">
                <div
                  className="name"
                  onClick={event => this.setFocus(event, "name")}
                  ref={node => (this.nameCard = node)}
                >
                  <label htmlFor="name">Card Holder</label>
                  <div id="name">
                    <div
                      className={`placeholder ${
                        cardName.length > 0 ? "hidden" : "shown"
                      }`}
                    >
                      FULL NAME
                    </div>
                    <div className="name-container">
                      {cardName.split("").map((char, index) => (
                        <div
                          className={`character ${
                            /\s/.test(char) ? "space" : ""
                          }`}
                          key={index}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className="expiration"
                  onClick={event => this.setFocus(event, "month")}
                  ref={node => (this.expirationCard = node)}
                >
                  <label htmlFor="expiration">Expires</label>
                  <div id="expiration">
                    <div
                      className={`double-digit ${
                        toggleMonth ? "toggle1" : "toggle2"
                      }`}
                    >
                      {expiryMonth === 0 ? "MM" : `${expiryMonth + 100}`.slice(-2)}
                    </div>
                    <div className="double-digit">/</div>
                    <div
                      className={`year double-digit ${
                        toggleYear ? "toggle1" : "toggle2"
                      }`}
                      onClick={event => this.setFocus(event, "year")}
                    >
                      {expiryYear === 0 ? "YY" : `${expiryYear}`.slice(-2)}
                    </div>
                  </div>
                </div>
                </div>
               
              </div>
            </div>

            <div className="creditcard cover back">
              <p>Cvc</p>
            </div>
          </div>
        </div>
        <div className="creditcard-inputs">
        <form onSubmit={this.handleSubmit}>
            <div className="creditcard-lg-input">
              <label htmlFor="cardNumber"> Card Number</label>
              <input
                className="number-input"
                id="cardNumber"
                type="text"
                onChange={event => this.handleChange(event, "cardNumber")}
                onSelect={event => this.moveSlider(event, "number")}
                value={this.formatCardNumber(cardNumber)}
                ref={node => (this.numberInput = node)}
                maxLength="19"
              />
            </div>
            <div className="creditcard-lg-input">
              <label htmlFor="cardName">Card Holder's Name</label>
              <input
                className="name-input"
                id="cardName"
                type="text"
                onChange={event => this.handleChange(event, "cardName")}
                onSelect={event => this.moveSlider(event, "name")}
                ref={node => (this.nameInput = node)}
                value={cardName}
                maxLength="24"
              />
            </div>
            <div className="med-input">
              <label htmlFor="expiryMonth">Expiration Date</label>
              <select
                className="month-input"
                id="expiryMonth"
                value={expiryMonth}
                onChange={event => this.handleChange(event, "expiryMonth")}
                onFocus={event => this.moveSlider(event, "month")}
                ref={node => (this.monthInput = node)}
              >
                {" "}
                <option value="0" disabled>
                  Month
                </option>
                {Object.keys(MONTHS).map(monthKey => (
                  <option
                    key={monthKey}
                    value={monthKey}
                    disabled={
                      expiryYear === CURRENT_YEAR &&
                      Number(monthKey) <= CURRENT_MONTH
                    }
                  >
                    {MONTHS[monthKey]}
                  </option>
                ))}
              </select>
              <select
                className="year-input"
                id="expiryYear"
                value={expiryYear}
                onChange={event => this.handleChange(event, "expiryYear")}
                onFocus={event => this.moveSlider(event, "year")}
                ref={node => (this.yearInput = node)}
              >
                {" "}
                <option value="0" disabled>
                  Year
                </option>
                {YEARS.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm-input">
              <label htmlFor="cvc">Cvc</label>
              <input
                className="Cvc-input"
                id="cvc"
                value={cvc}
                onChange={event => this.handleChange(event, "cvc")}
                onSelect={() => this.setState({ cardFlipped: true })}
                ref={node => (this.CvcInput = node)}
                maxLength="3"
                
              />
            </div>
            <button
              className={`creditcard-lg-input ${canSubmit ? "disabled" : ""}`}
              disabled={canSubmit} type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}


function CreditCardForm1() {
  return (
    <div>
        <CreditCardForm/>
    </div>
  )
}

export default CreditCardForm1