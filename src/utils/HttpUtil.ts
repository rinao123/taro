import Taro, { General, request } from '@tarojs/taro';
import CommonUtil from './CommonUtil';

export interface HttpOptions {
    header?: General.IAnyObject;
    method?: keyof request.method;
    showFail?: boolean;
}

type Method = keyof request.method;

class HttpUtil {
    public static instance: HttpUtil | null = null;
    public static readonly HEADER_SKEY: string = 'X-WX-Skey';
    private skey: string;

    private constructor() {
        this.skey = '';
    }

    public static getInstance = (): HttpUtil => {
        if (!HttpUtil.instance) {
            HttpUtil.instance = new HttpUtil();
        }
        return HttpUtil.instance;
    }

    public request = async (url: string, option: HttpOptions) => {
        option.header = this.addContentTypeToHeader(option.header, option.method);
        option.header = this.addSkeyToHeader(option.header);
        try {
            const options = { url: url, header: option.header, method: option.method };
            const response = await Taro.request(options);
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
            // log.warn(url, options, error);
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

export default HttpUtil.getInstance();