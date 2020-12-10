import React, { Component } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import DividingRuler from '../../components/dividingRuler/dividingRuler';
import './index.scss';


type PageStateProps = {
	store: {
		counterStore: {
			counter: number,
			increment: Function,
			decrement: Function,
			incrementAsync: Function
		}
	}
}

interface Index {
	props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {
	componentWillMount() { }

	componentDidMount() { }

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }

	increment = () => {
		const { counterStore } = this.props.store
		counterStore.increment()
	}

	decrement = () => {
		const { counterStore } = this.props.store
		counterStore.decrement()
	}

	incrementAsync = () => {
		const { counterStore } = this.props.store
		counterStore.incrementAsync()
	}

	render() {
		const { counterStore: { counter } } = this.props.store
		return (
			<View className='index'>
				<View className='dividingRuler'>
					<DividingRuler min={140} max={200} step={10} title="身高" unit="厘米" />
				</View>
				<Button onClick={this.increment}>+</Button>
				<Button onClick={this.decrement}>-</Button>
				<Button onClick={this.incrementAsync}>Add Async</Button>
				<Text>{counter}</Text>
			</View>
		)
	}
}

export default Index
