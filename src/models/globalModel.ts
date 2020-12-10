import { observable } from 'mobx';
import UserModel from './userModel';

class GlobalModel {
    @observable private _userInfo: UserModel | null;
    private _launchOptions: { [key: string]: any };

    public constructor() {
        this._userInfo = null;
        this._launchOptions = {};
    }

    public get userInfo(): UserModel | null {
        return this._userInfo;
    }

    public set userInfo(userInfo: UserModel | null) {
        this._userInfo = userInfo;
    }

    public get launchOptions(): { [key: string]: any } {
        return this._launchOptions;
    }

    public set launchOptions(launchOptions: { [key: string]: any }) {
        this._launchOptions = launchOptions;
    }
}

const global = new GlobalModel();
export default global;
