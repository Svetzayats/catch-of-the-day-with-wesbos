import React from 'react'; 
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish'; 
import base from '../base';


class App extends React.Component {
	static propTypes = {
		match: PropTypes.object
	}
	state = {
		fishes: {}, 
		order: {}
	}; 
	componentDidMount() {
		const {params} = this.props.match;
		const localStorageRef = localStorage.getItem(params.storeId); 
		if (localStorageRef) {
			this.setState({order: JSON.parse(localStorageRef)})
		}
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this, 
			state: 'fishes'
		})
	}; 
	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	};
	componentWillUnmount() {
		base.removeBinding(this.ref);
	}
	addFish = fish => {
		// 1. делаем копию существующего state 
		const fishes = {...this.state.fishes}; 
		// 2. добавляем новую рыбу 
		fishes[`fish${Date.now()}`] = fish; 
		// 3. обновить state 
		this.setState({
			fishes: fishes
		})
	}; 
	updateFish = (key, updatedFish) => {
		const fishes = {...this.state.fishes}; 
		fishes[key] = updatedFish;
		this.setState({
			fishes: fishes
		})
	};
	deleteFish = key => {
		const fishes = {...this.state.fishes};
		fishes[key] = null; //это чтобы и в firebase рыба тоже убралась
		this.setState({
			fishes: fishes
		})
	};
	deleteFishFromOrder = key => {
		const order = {...this.state.order};
		delete order[key]; //так как нам не нужно обновлять firebase
		this.setState({ order });
	};
	loadSampleFishes = () => {
		this.setState({fishes: sampleFishes});
	}; 
	addToOrder = (key) => {
		const order = {...this.state.order}; 
		order[key] = order[key] + 1 || 1; 
		this.setState({order});
	}
	render () {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => 
							<Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} 
					order={this.state.order}
					deleteFishFromOrder={this.deleteFishFromOrder}/>
				<Inventory addFish = {this.addFish} 
						updateFish = {this.updateFish}
						deleteFish = {this.deleteFish}
						deleteFishFromOrder = {this.deleteFishFromOrder}
						loadSampleFishes={this.loadSampleFishes}
						fishes={this.state.fishes}
						storeId={this.props.match.params.storeId} //эта штука приходит из React Router
						/>
				
			</div>

			)
	}
}

export default App;