	import React from 'react'; 
	import PropTypes from 'prop-types';
	import firebase from 'firebase';
	import AddFishForm from './AddFishForm'; 
	import EditFishForm from './EditFishForm'; 
	import Login from './Login'; 
	import base, { firebaseApp } from '../base';
	


	class Inventory extends React.Component {
		static propTypes = {
			fishes: PropTypes.object,
			updateFish: PropTypes.func,
			deleteFish: PropTypes.func, 
			deleteFishFromOrder: PropTypes.func,
			addFish: PropTypes.func, 
			loadSampleFishes: PropTypes.func
		};

		state = {
			uid: null, 
			owner: null
		}

		//слушаем, авторизован ли кто-то 
		componentDidMount() {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					this.authHandler({ user });
				}
			})
		}

		authHandler = async (authData) => {
			//смотрим на наш магазин в firebase 
			//base.fetch() возвращает деферед, поэтому надо await
			const store = await base.fetch(this.props.storeId, {context: this});
			if (!store.owner) {
				await base.post(`${this.props.storeId}/owner`, {
					data: authData.user.uid
				});
			}
			this.setState({
				uid: authData.user.uid, 
				owner: store.owner || authData.user.uid
			})
		};

		authenticate = (provider) => {
			const authProvider = new firebase.auth[`${provider}AuthProvider`]();
			firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
		};

		logout = async () => {
			console.log('Logging out');
			await firebase.auth().signOut();
			this.setState({ uid: null })
		}

		render () {
			//кнопка выхода - используем ее потом в двух местах, зовя как переменную
			const logout = <button onClick={this.logout}>Log Out!</button>
			//проверяем, залогинился ли кто-то уже 
			if (!this.state.uid) {
				return <Login authenticate={this.authenticate}/>
			}
			//проверяем, владелец ли он этого магазина 
			if (this.state.uid !== this.state.owner) {
				return <div><p>Sorry, you are not the owner</p>
				{logout}
				</div>
			}
			return (
				<div className="inventory">
					<h2>Inventory</h2>
					{logout}
					{Object.keys(this.props.fishes).map(key => <EditFishForm 
						key={key} 
						index={key}
						fish={this.props.fishes[key]}
						updateFish={this.props.updateFish}
						deleteFish = {this.props.deleteFish}
						deleteFishFromOrder = {this.props.deleteFishFromOrder}
						/>)}
					<AddFishForm addFish={this.props.addFish}/>
					<button onClick={this.props.loadSampleFishes}>Load Sample Fish</button>
				</div>
				
				)
		}
	}

	export default Inventory;