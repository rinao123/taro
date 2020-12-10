import { observable } from 'mobx';

export enum Gender {
    unknown = 0,
    male = 1,
    female = 2
}

export default class UserModel {
    private _uid: string;
    @observable private _nickName: string;
    @observable private _avatar: string;
    @observable private _mobile: string;
    @observable private _gender: Gender;
    @observable private _authorized: boolean;

    public constructor() {
        this._uid = "";
        this._nickName = "";
        this._avatar = "";
        this._mobile = "";
        this._gender = Gender.unknown;
        this._authorized = false;
    }

    public get uid(): string {
        return this._uid;
    }

    public set uid(uid: string) {
        this._uid = uid;
    }

    public get nickName(): string {
        return this._nickName;
    }

    public set nickName(nickName: string) {
        this._nickName = nickName;
    }

    public get avatar(): string {
        return this._avatar;
    }

    public set avatar(avatar: string) {
        this._avatar = avatar;
    }

    public get mobile(): string {
        return this._mobile;
    }

    public set mobile(mobile: string) {
        this._mobile = mobile;
    }

    public get gender(): Gender {
        return this._gender;
    }

    public set gender(gender: Gender) {
        this._gender = gender;
    }

    public get authorized(): boolean {
        return this._authorized;
    }

    public set authorized(authorized: boolean) {
        this._authorized = authorized;
    }

    public static fromJson = (json: { [key: string]: any }): UserModel => {
        let user = new UserModel();
        user.uid = json.uid;
        user.nickName = json.nickName;
        user.avatar = json.avatarUrl;
        user.mobile = json.mobile;
        user.gender = json.gender;
        user.authorized = json.authorized;
        return user;
    }
}
