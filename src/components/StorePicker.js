import React from 'react'; 
import PropTypes from 'prop-types';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
	static propTypes = {
		history: PropTypes.object
	};
	/*constructor() {
		super(); 
		this.goToStore = this.goToStore.bind(this); // привязываем контекст, иначе он у нас потом undefined
	}*/
	myInput = React.createRef(); 
	goToStore = (event) => {
		// 1. Stop the form from submitting
		event.preventDefault();
		// 2. get the text from that input
		const storeName = this.myInput.value.value;
		// 3. Change the page to /store/name
		this.props.history.push(`/store/${storeName}`);

	}
	render() {
		{/*return <p>Hello!</p>
		return React.createElement('p', { className: 'hey'}, 'Heyyyooo'); 
		используем className вместо class!*/} 
		return (
			<React.Fragment>
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter a Store</h2>
				<input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()}/>
				<button type="submit">Visit Store ➟</button>
			</form>
			</React.Fragment>
		) 	
	}
} 

export default StorePicker;