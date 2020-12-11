import React, { Component, ReactElement } from 'react';
import { View, Text, ScrollView, BaseEventOrig } from '@tarojs/components';
import { ScrollViewProps } from '@tarojs/components/types/ScrollView';
import CommonUtil from '../../utils/commonUtil';
import styles from './dividingRuler.module.scss';

interface DividingRulerProps {
    min: number;
    max: number;
    step: number;
    value: number;
    title: string;
    unit: string;
    onChange: (value: number) => void;
}

export default class DividingRuler extends Component<DividingRulerProps> {
    public static readonly DIVIDING_WIDTH: number = CommonUtil.rpxToPx(24);
    private _scrollEndTimer: NodeJS.Timer | null;

    constructor(props: DividingRulerProps) {
        super(props);
        this._scrollEndTimer = null;
    }

    render() {
        return (
            <View className={styles.dividingRuler}>
                {this._renderHeader()}
                {this._renderRuler()}
                <View className={styles.current} />
            </View>
        );
    }

    private _renderHeader = (): ReactElement => {
        const { title, unit, value } = this.props;
        return (
            <View className={styles.header}>
                <Text className={styles.title}>{title}</Text>
                <Text className={styles.value}>{value}</Text>
                <Text className={styles.unit}>{unit}</Text>
            </View>
        );
    }

    private _renderRuler = (): ReactElement => {
        const { min, max, step, value } = this.props;
        const scrollLeft: number = (value - min - 1.5 * step) * 10 / step * DividingRuler.DIVIDING_WIDTH;
        let distances: Array<ReactElement> = [];
        for (let i = min + step; i <= max - step; i += step) {
            const distance = this._renderDistance(i);
            distances.push(distance);
        }
        return (
            <ScrollView
                className={styles.rulerContainer}
                scrollX={true}
                scrollLeft={scrollLeft}
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
        const { min, step } = this.props;
        if (this._scrollEndTimer) {
            clearTimeout(this._scrollEndTimer);
            this._scrollEndTimer = null;
        }
        this._scrollEndTimer = setTimeout(() => {
            let value = min + (15 + event.detail.scrollLeft / DividingRuler.DIVIDING_WIDTH) * step / 10;
            value = Math.round(value / (step / 10)) * (step / 10);
            let fractionDigits = 0;
            const strs = (step / 10).toString().split(".");
            if (strs.length > 1) {
                fractionDigits = strs[1].length;
            }
            value = parseFloat(value.toFixed(fractionDigits));
            this.props.onChange(value);
        }, 300);
    }
}