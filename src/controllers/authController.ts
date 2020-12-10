import Taro from '@tarojs/taro';
import CommonUtil from '../utils/commonUtil';
import httpUtil from '../utils/httpUtil';
import AuthApi from '../apis/authApi';
import global from '../models/globalModel';
import UserModel from '../models/userModel';

class AuthController {
    public login = async (): Promise<any> => {
        try {
            await CommonUtil.retry(this._doLogin);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    private _doLogin = async (): Promise<any> => {
        const systemInfo = JSON.stringify(Taro.getSystemInfoSync());
        const query = JSON.stringify(global.launchOptions.query);
        const scene = global.launchOptions.scene;
        try {
            const valid = await this._checkSession();
            if (!valid) {
                const code = await this._getCode();
                const data = await AuthApi.login(code, systemInfo, query, false);
                httpUtil.saveSkey(data.skey);
                global.userInfo = UserModel.fromJson(data.userInfo);
            } else {
                let userInfo = await AuthApi.checkSkey(query, scene, false);
                if (!userInfo) {
                    const code = await this._getCode();
                    const data = await AuthApi.login(code, systemInfo, query, false);
                    httpUtil.saveSkey(data.skey);
                    userInfo = data.userInfo;
                }
                global.userInfo = UserModel.fromJson(userInfo);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    private _checkSession = async (): Promise<boolean> => {
        try {
            await Taro.checkSession();
            return true;
        } catch (error) {
            return false;
        }
    }

    private _getCode = async (): Promise<string> => {
        try {
            const response = await Taro.login();
            return response.code;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const authController = new AuthController();
export default authController;
