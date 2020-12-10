import Taro, { General, request } from '@tarojs/taro';
import CommonUtil from './commonUtil';
import logUtil from './logUtil';

export interface HttpOptions extends request.Option {
    showFail?: boolean;
}

type Method = keyof request.method;

class HttpUtil {
    public static readonly HEADER_SKEY: string = 'X-WX-Skey';
    private skey: string;

    public constructor() {
        this.skey = '';
    }

    public request = async (url: string, option: HttpOptions) => {
        option.header = this.addContentTypeToHeader(option.header, option.method);
        option.header = this.addSkeyToHeader(option.header);
        try {
            option.url = url;
            const response = await Taro.request(option);
            console.log(url, option, response);
            if (response.statusCode === 401) {
                if (option.showFail !== false) {
                    this.showLoginTimeOut();
                }
                return Promise.reject(response);
            } else if (response.statusCode !== 200 && !(response.data && response.data.msg)) {
                if (option.showFail !== false) {
                    CommonUtil.showFail('抱歉，服务器繁忙，请稍后再试');
                }
                return Promise.reject(response);
            }
            return response;
        } catch (error) {
            logUtil.warn(url, option, error);
            console.warn(url, option, error);
            if (option.showFail !== false) {
                CommonUtil.showFail('网络请求失败，请检查您的网络状态');
            }
            return Promise.reject(error);
        }
    }

    public saveSkey = (skey: string): void => {
        this.skey = skey;
        Taro.setStorageSync(HttpUtil.HEADER_SKEY, skey);
    }

    private getSkey = (): string => {
        return Taro.getStorageSync(HttpUtil.HEADER_SKEY) || '';
    }

    private addSkeyToHeader = (header?: General.IAnyObject): General.IAnyObject | undefined => {
        header = header || {};
        header[HttpUtil.HEADER_SKEY] = this.skey || this.getSkey();
        return header;
    }

    private addContentTypeToHeader = (header?: General.IAnyObject, method?: Method): General.IAnyObject | undefined => {
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

    private showLoginTimeOut = async (): Promise<void> => {
        try {
            await CommonUtil.showModal('提示', '登录状态失效，点击确定重新登录', false);
            // globalData.userInfo = null;
            // authController.login();
            Taro.reLaunch({ url: '/pages/index/index' });
        } catch (error) {
            console.info(error);
        }
    }
}

export default new HttpUtil();
