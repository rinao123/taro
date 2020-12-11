import { observable, action } from 'mobx';

export default class IndexController {
    @observable private _height: number;
    @observable private _startWeight: number;
    @observable private _targetWeight: number;

    constructor() {
        this._height = 160;
        this._startWeight = 60;
        this._targetWeight = 60;
    }

    public get height(): number {
        return this._height;
    }

    public set height(height: number) {
        this._height = height;
    }

    public get startWeight(): number {
        return this._startWeight;
    }

    public set startWeight(startWeight: number) {
        this._startWeight = startWeight;
    }

    public get targetWeight(): number {
        return this._targetWeight;
    }

    public set targetWeight(targetWeight: number) {
        this._targetWeight = targetWeight;
    }
}