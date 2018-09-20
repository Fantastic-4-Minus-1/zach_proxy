import React from 'react';
import PropTypes from 'prop-types';
import Analyst from './Analyst.jsx';

const Company = ({
  marketisOpen,
  currentPercentage,
  company,
  price,
}) => (
  <div className={marketisOpen ? 'robinhood-is-open' : 'robinhood-is-closed'}>
    <div className={`flex-item ${marketisOpen ? 'robinhood-open' : 'robinhood-closed'}`}>
      <div className="company-title">
        {company.company}
        <br />
        <span>
          <Analyst
            display={`${company.percentage}%`}
            tooltip={`${company.percentage}% anaylsts agree that
        ${company.company} is a buy.`}
            marketisOpen={marketisOpen}
          />
        </span>
      </div>
      <div className={`price ${currentPercentage > 0 ? 'price-is-up' : 'price-is-down'}`}>{`$${price}`}</div>
      <span className={`${currentPercentage > 0 ? 'price-is-up' : 'price-is-down'}`}>
        {`${currentPercentage}%`}
      </span>
    </div>
  </div>
);

Company.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    group: PropTypes.number,
    percentage: PropTypes.number,
    currentDay: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  price: PropTypes.number.isRequired,
  currentPercentage: PropTypes.number.isRequired,
  marketisOpen: PropTypes.bool.isRequired,
};

export default Company;