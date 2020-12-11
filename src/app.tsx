import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import authController from './controllers/authController';
import global from './models/globalModel';
import counterStore from './store/counter';
import './app.scss';

const store = {
	counterStore
}

@observer
export default class App extends Component {

	onLaunch(options: { [key: string]: any }) {
		global.launchOptions = options;
		authController.login();
	}

	render() {
		return (
			<Provider store={store}>
				{this.props.children}
			</Provider>
		);
	}
}
