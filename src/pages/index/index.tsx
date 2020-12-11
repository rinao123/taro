import React, { Component } from 'react';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import DividingRuler from '../../components/dividingRuler/dividingRuler';
import IndexController from '../../controllers/indexController';
import styles from './index.module.scss';

@observer
export default class Index extends Component {
	private _controller: IndexController;

	constructor(props: any) {
		super(props);
		this._controller = new IndexController();
	}

	public render() {
		const { height, startWeight, targetWeight } = this._controller;
		return (
			<View className={styles.index}>
				<View className={styles.dividingRuler}>
					<DividingRuler 
						min={130} 
						max={220} 
						step={10} 
						value={height} 
						title="身高" 
						unit="厘米"
						onChange={this._onHeightChange}
					/>
				</View>
				<View className={styles.dividingRuler}>
					<DividingRuler 
						min={40} 
						max={150} 
						step={1} 
						value={startWeight} 
						title="起始体重" 
						unit="公斤"
						onChange={this._onStartWeightChange}
					/>
				</View>
				<View className={styles.dividingRuler}>
					<DividingRuler 
						min={40} 
						max={150} 
						step={1} 
						value={targetWeight} 
						title="目标体重" 
						unit="公斤"
						onChange={this._onTargetWeightChange}
					/>
				</View>
			</View>
		);
	}

	private _onHeightChange = (value: number): void => {
		this._controller.height = value;
	}

	private _onStartWeightChange = (value: number): void => {
		this._controller.startWeight = value;
	}

	private _onTargetWeightChange = (value: number): void => {
		this._controller.targetWeight = value;
	}
}
