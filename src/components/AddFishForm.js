	import React from 'react'; 
	import PropTypes from 'prop-types';

	class AddFishForm extends React.Component {
		nameRef = React.createRef(); 
		priceRef = React.createRef(); 
		statusRef = React.createRef(); 
		descRef = React.createRef(); 
		imageRef = React.createRef(); 

		static propTypes = {
			addFish: PropTypes.func
		}


		createFish = event => {
			// 1. stop the form from submitting 
			event.preventDefault(); 
			// 2. create fish
			const fish = {
				name: this.nameRef.value.value,  
				price: parseFloat(this.priceRef.value.value),
				status: this.statusRef.value.value,
				desc: this.descRef.value.value,
				image: this.imageRef.value.value,
			}; 
			this.props.addFish(fish);
			event.currentTarget.reset(); 

		}
		render () {
			return (
				<form className="fish-edit" onSubmit={this.createFish}>
					<input name="name" ref={this.nameRef} type="text" placeholder="Name"></input>
					<input name="price" ref={this.priceRef} type="text" placeholder="Price"></input>
					<select name="status" ref={this.statusRef}>
						<option value="available">Fresh!</option>
						<option value="unavailable">Sold Out!</option>
					</select>
					<textarea name="desc" ref={this.descRef} placeholder="Desc"></textarea>
					<input name="image" ref={this.imageRef} type="text" placeholder="Image"></input>
					<button type="submit">+ Add Fish</button>
				</form>
				);
		}
	}

	export default AddFishForm;