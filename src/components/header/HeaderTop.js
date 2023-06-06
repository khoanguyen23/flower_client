import PropTypes from "prop-types";
import React from "react";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/actions/currencyActions";

const HeaderTop = ({
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch,
  borderStyle
}) => {
  return (
    
      
      <div className="header-offer">
        <p>
          Miễn phí vận chuyển cho đơn từ 500.000{" "}
         
        </p>
      </div>
   
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrency: currencyName => {
      dispatch(setCurrency(currencyName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(HeaderTop));
