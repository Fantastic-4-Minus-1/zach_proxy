import React from 'react';

const StopLimitOrder = (props) => {
	
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
	const className= marketOpen ? 'Opened' : 'Closed';
		return(
			<div>
				<label>
					<div> Stop Price </div>
					<input className={"orderInput"+className + " " + "input"+className} placeholder="$0.00" ></input>
				</label>

				<label>
					{popup}
					<input className={"orderInput"+className + " " + "input"+className} value={"$" + currentPrice}></input>
				</label>

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
					<div> Expiration </div>
					<select className={"selectInput"+className}>
						<option value="0">Good For Today </option>
						<option value="1">Good Till Cancel </option>
					</select>
				</label>

				<label className={"estimatedCost"+className}>
					<div>Estimated Cost</div>
					<span> ${parseFloat((total).toFixed(2)) || "0.00"} </span>
				</label>
			</div>

		)
	
}

export default StopLimitOrder;

