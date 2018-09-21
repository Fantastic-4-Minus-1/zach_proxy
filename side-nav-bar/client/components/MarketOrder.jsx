import React from 'react';

const MarketOrder = (props) => {
	const {
		companies,
		renderWatch,
		changeButton,
		total,
		onChangeHandler,
		currentPrice,
		marketOpen,
		popup,
	} = props;
	const className = marketOpen ? 'Opened' : 'Closed';
		return (
			<div>
				<label>
					<div> Shares </div>
					<input 
						className={"orderInput"+className + " " + "input"+className} 
						min="0" 
						placeholder="0" 
						step="1" 
						name="quantity" 
						onChange={onChangeHandler}>
					</input>
				</label>
				<label>
				{popup}
				<span> ${currentPrice} </span>
				</label>

				<label className={"estimatedCost"+className}>
					<div>Estimated Cost</div>
					<span> ${parseFloat((total).toFixed(2)) || "0.00"} </span>
				</label>
			</div>
		)
	
}

export default MarketOrder;

