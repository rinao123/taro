import React, { Component, ReactElement } from 'react';
import { View, Text, ScrollView, BaseEventOrig } from '@tarojs/components';
import styles from './dividingRuler.module.scss';
import { ScrollViewProps } from '@tarojs/components/types/ScrollView';

interface DividingRulerProps {
    min: number;
    max: number;
    step: number;
    title: string;
    unit: string;
}

interface DividingRulerState {
    current: number;
}

export default class DividingRuler extends Component<DividingRulerProps, DividingRulerState> {

    public constructor(props: DividingRulerProps) {
        super(props);
        this.state = { current: 155 };
    }

    public render = (): ReactElement => {
        return (
            <View className={styles.dividingRuler}>
                {this._renderHeader()}
                {this._renderRuler()}
                <View className={styles.current} />
            </View>
        );
    }

    private _renderHeader = (): ReactElement => {
        const { title, unit } = this.props;
        const { current } = this.state;
        return (
            <View className={styles.header}>
                <Text className={styles.title}>{title}</Text>
                <Text className={styles.value}>{current}</Text>
                <Text className={styles.unit}>{unit}</Text>
            </View>
        );
    }

    private _renderRuler = (): ReactElement => {
        const { min, max, step } = this.props;
        const { current } = this.state;
        let distances: Array<ReactElement> = [];
        for (let i = min + step; i <= max - step; i += step) {
            const distance = this._renderDistance(i);
            distances.push(distance);
        }
        return (
            <ScrollView 
                className={styles.rulerContainer} 
                scrollX={true} 
                scrollWithAnimation={false} 
                scrollLeft={(current - 155) * 10} 
                onScroll={this._onScroll}
            >
                <View className={styles.ruler}>
                    {this._renderLeft()}
                    {distances}
                    {this._renderRight()}
                </View>
            </ScrollView>
        );
    }

    private _renderLeft = (): ReactElement => {
        return (
            <View className={styles.distance}>
                <View className={styles.dividings}>
                    <View className={`${styles.dividing} ${styles.nothing} ${styles.first}`} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={`${styles.dividing} ${styles.middle} ${styles.last}`} />
                </View>
                <View className={styles.text} />
            </View>
        );
    }

    private _renderRight = (): ReactElement => {
        return (
            <View className={styles.distance}>
                <View className={styles.dividings}>
                    <View className={`${styles.dividing} ${styles.middle} ${styles.first}`} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                </View>
                <View className={styles.text} />
            </View>
        );
    }

    private _renderDistance = (value: number): ReactElement => {
        return (
            <View className={styles.distance} key={value}>
                <View className={styles.dividings}>
                    <View className={`${styles.dividing} ${styles.middle} ${styles.first}`} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={`${styles.dividing} ${styles.long}`} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={styles.dividing} />
                    <View className={`${styles.dividing} ${styles.middle} ${styles.last}`} />
                </View>
                <Text className={styles.text}>{value}</Text>
            </View>
        );
    }

    private _onScroll = (event: BaseEventOrig<ScrollViewProps.onScrollDetail>): void => {
        const current = Math.round(155 + event.detail.scrollLeft / 10);
        this.setState({ current: current });
    }
}