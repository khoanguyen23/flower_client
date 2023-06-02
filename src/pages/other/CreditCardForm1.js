import React from 'react'

//TODO: Add components prop-types, add cvv animation

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
    cardNumber: "",
    cardName: "",
    cardMonth: 0,
    cardYear: 0,
    cardCvv: "",
    cardType: "visa",
    toggleMonth: true,
    toggleYear: true,
    showCard: false,
    cardFlipped: false
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
    } else if (type === "cardMonth") {
      value = Number(value);
      this.setState(prevState => ({
        [type]: value,
        toggleMonth: !prevState.toggleMonth
      }));
    } else if (type === "cardYear") {
      value = Number(value);
      const { cardMonth } = this.state;
      if (value === CURRENT_YEAR && cardMonth <= CURRENT_MONTH) {
        this.setState(prevState => ({
          cardMonth: 0,
          cardYear: value,
          toggleYear: !prevState.toggleYear,
          toggleMonth: !prevState.toggleMonth
        }));
      } else {
        this.setState(prevState => ({
          [type]: value,
          toggleYear: !prevState.toggleYear
        }));
      }
    } else if (type === "cardCvv") {
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
  };

  canSubmit = () => {
    const { cardNumber, cardName, cardMonth, cardYear, cardCvv } = this.state;

    return (
      cardNumber.length === 16 &&
      cardName.length > 4 &&
      cardCvv.length === 3 &&
      cardMonth !== 0 &&
      cardYear !== 0
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
    if (!this.cvvInput.contains(event.target)) {
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
      cardMonth,
      cardYear,
      cardCvv,
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
                      {cardMonth === 0 ? "MM" : `${cardMonth + 100}`.slice(-2)}
                    </div>
                    <div className="double-digit">/</div>
                    <div
                      className={`year double-digit ${
                        toggleYear ? "toggle1" : "toggle2"
                      }`}
                      onClick={event => this.setFocus(event, "year")}
                    >
                      {cardYear === 0 ? "YY" : `${cardYear}`.slice(-2)}
                    </div>
                  </div>
                </div>
                </div>
               
              </div>
            </div>

            <div className="creditcard cover back">
              <p>CVV</p>
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
              <label htmlFor="cardMonth">Expiration Date</label>
              <select
                className="month-input"
                id="cardMonth"
                value={cardMonth}
                onChange={event => this.handleChange(event, "cardMonth")}
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
                      cardYear === CURRENT_YEAR &&
                      Number(monthKey) <= CURRENT_MONTH
                    }
                  >
                    {MONTHS[monthKey]}
                  </option>
                ))}
              </select>
              <select
                className="year-input"
                id="cardYear"
                value={cardYear}
                onChange={event => this.handleChange(event, "cardYear")}
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
              <label htmlFor="cardCvv">CVV</label>
              <input
                className="cvv-input"
                id="cardCvv"
                value={cardCvv}
                onChange={event => this.handleChange(event, "cardCvv")}
                onSelect={() => this.setState({ cardFlipped: true })}
                ref={node => (this.cvvInput = node)}
                maxLength="3"
                
              />
            </div>
            <button
              className={`creditcard-lg-input ${canSubmit ? "disabled" : ""}`}
              disabled={canSubmit}
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
