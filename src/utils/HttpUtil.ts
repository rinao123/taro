import Taro, { General, request } from '@tarojs/taro';
import CommonUtil from './commonUtil';
import logUtil from './logUtil';
import authController from '../controllers/authController';
import global from '../models/globalModel';

export interface HttpOptions extends Partial<request.Option> {
    showFail?: boolean;
}

type Method = keyof request.method;
type Response = request.SuccessCallbackResult<any>;

class HttpUtil {
    public static readonly HEADER_SKEY = 'X-WX-Skey';
    private _skey: string;

    public constructor() {
        this._skey = '';
    }

    public request = async (url: string, options: HttpOptions): Promise<Response> => {
        options.header = this._addContentTypeToHeader(options.header, options.method);
        options.header = this._addSkeyToHeader(options.header);
        try {
            options.url = url;
            const response = await Taro.request(options as request.Option);
            console.log(url, options, response);
            if (response.statusCode === 401) {
                if (options.showFail !== false) {
                    this._showLoginTimeOut();
                }
                return Promise.reject(response);
            } else if (response.statusCode !== 200 && !(response.data && response.data.msg)) {
                if (options.showFail !== false) {
                    CommonUtil.showFail('抱歉，服务器繁忙，请稍后再试');
                }
                return Promise.reject(response);
            }
            return response;
        } catch (error) {
            logUtil.warn(url, options, error);
            console.warn(url, options, error);
            if (options.showFail !== false) {
                CommonUtil.showFail('网络请求失败，请检查您的网络状态');
            }
            return Promise.reject(error);
        }
    }

    public saveSkey = (skey: string): void => {
        this._skey = skey;
        Taro.setStorageSync(HttpUtil.HEADER_SKEY, skey);
    }

    private _getSkey = (): string => {
        return Taro.getStorageSync(HttpUtil.HEADER_SKEY) || '';
    }

    private _addSkeyToHeader = (header?: General.IAnyObject): General.IAnyObject | undefined => {
        header = header || {};
        header[HttpUtil.HEADER_SKEY] = this._skey || this._getSkey();
        return header;
    }

    private _addContentTypeToHeader = (header?: General.IAnyObject, method?: Method): General.IAnyObject | undefined => {
        if (method !== 'POST') {
            return header;
        }
        if (!header) {
            header = { 'Content-Type': 'application/x-www-form-urlencoded' };
        } else if (!header['Content-Type']) {
            header['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return header;
    }

    private _showLoginTimeOut = async (): Promise<void> => {
        try {
            await CommonUtil.showModal('提示', '登录状态失效，点击确定重新登录', false);
            global.userInfo = null;
            authController.login();
            Taro.reLaunch({ url: '/pages/index/index' });
        } catch (error) {
            console.info(error);
        }
    }
}

const httpUtil = new HttpUtil();
export default httpUtil;
