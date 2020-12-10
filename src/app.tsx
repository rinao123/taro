import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import authController from './controllers/authController';
import global from './models/globalModel';
import counterStore from './store/counter';
import './app.scss';

const store = {
	counterStore
}

class App extends Component {
	onLaunch(options: { [key: string]: any }) {
		global.launchOptions = options;
		authController.login();
	}

	componentDidMount() {

	}

	componentDidShow() { }

	componentDidHide() { }

	componentDidCatchError() { }

	render() {
		return (
			<Provider store={store}>
				{this.props.children}
			</Provider>
		)
	}
}

export default App
