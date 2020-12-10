import config from '../config';
import HttpUtil, { HttpOptions } from '../utils/httpUtil';

export default class AuthApi {
	public static readonly HEADER_CODE = 'X-WX-Code';
	public static readonly CHECK_SKEY_URL = `${config.frontServer}/auth/check`;
	public static readonly LOGIN_URL = `${config.frontServer}/auth/login`;
	public static readonly AUTHORIZE_URL = `${config.frontServer}/auth/authorize`;
	public static readonly BIND_MOBILE_URL = `${config.frontServer}/auth/get_phone_number`;

	public static checkSkey = async (query: string, scene: number, showFail: boolean = true): Promise<any> => {
		const options: HttpOptions = {
			data: { ext_param: query, via: scene },
			showFail: showFail
		};
		try {
			const response = await HttpUtil.request(AuthApi.CHECK_SKEY_URL, options);
			if (response.data.ret !== 0) {
				return Promise.reject(response);
			}
			if (response.data.loginState !== 1) {
				return null;
			}
			return response.data.userInfo;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public static login = async (code: string, systemInfo: string, query: string, showFail: boolean = true): Promise<any> => {
		const options: HttpOptions = {
			method: 'POST',
			header: { [AuthApi.HEADER_CODE]: code },
			data: { system_info: systemInfo, ext_param: query },
			showFail: showFail
		};
		try {
			const response = await HttpUtil.request(AuthApi.LOGIN_URL, options);
			if (response.data.ret !== 0) {
				return Promise.reject(response);
			}
			return {
				skey: response.data.skey,
				userInfo: response.data.userInfo
			};
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public static authorize = async (encryptedData: string, iv: string, showFail: boolean = true): Promise<any> => {
		const options: HttpOptions = {
			method: 'POST',
			data: { encryptedData: encryptedData, iv: iv },
			showFail: showFail
		};
		try {
			const response = await HttpUtil.request(AuthApi.AUTHORIZE_URL, options);
			if (response.data.ret !== 0) {
				return Promise.reject(response);
			}
			return response.data.userInfo;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public static bindMobile = async (encryptedData: string, iv: string, showFail: boolean = true): Promise<void> => {
		const options: HttpOptions = {
			method: 'POST',
			data: { encryptedData: encryptedData, iv: iv },
			showFail: showFail
		};
		try {
			const response = await HttpUtil.request(AuthApi.BIND_MOBILE_URL, options);
			if (response.data.ret !== 0) {
				return Promise.reject(response);
			}
			return response.data.userInfo;
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
