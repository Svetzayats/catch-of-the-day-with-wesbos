import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
	static propTypes = {
		fish: PropTypes.shape({
			name: PropTypes.string,
			status: PropTypes.string,
			desc: PropTypes.string,
			image: PropTypes.string,
			price: PropTypes.number

		}),
		updateFish: PropTypes.func, 
		index: PropTypes.string
	}
	handleChange = (event) => {
		const updatedFish = { 
			...this.props.fish, 
			[event.currentTarget.name]: event.currentTarget.value
			};
		this.props.updateFish(this.props.index, updatedFish)
	}
	render() {
		return <div className="fish-edit">
			<input name="name" type="text" onChange={this.handleChange} value={this.props.fish.name}></input>
			<input name="price" type="text" onChange={this.handleChange} value={this.props.fish.price}></input>
			<select name="status" onChange={this.handleChange} value={this.props.fish.status}>
				<option value="available" >Fresh!</option>
				<option value="unavailable">Sold Out!</option>
			</select>
			<textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc}></textarea>
			<input name="image" type="text" onChange={this.handleChange} value={this.props.fish.image}></input>
			<button onClick={() => {
				this.props.deleteFish(this.props.index); 
				this.props.deleteFishFromOrder(this.props.index)
			}}>Remove Fish</button>
		</div>
	}
}

	export default EditFishForm;