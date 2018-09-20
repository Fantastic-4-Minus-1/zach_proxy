import React from 'react';
import PropTypes from 'prop-types';

const PricesPaidHeader = ({ marketIsOpen }) => {
  const classNames = marketIsOpen ? 'main-header' : 'main-header is-open-header';
  return (
    <div className={classNames}>
      <h2> Price Paid on Robinhood</h2>
      <hr color="#0e0d0d" size="1" />
    </div>
  );
};

// propTypes
PricesPaidHeader.propTypes = {
  marketIsOpen: PropTypes.bool.isRequired,
};

export default PricesPaidHeader;
