import Taro, { RealtimeLogManager } from '@tarojs/taro';

class LogUtil {
	private _log: RealtimeLogManager | null = null;

	constructor() {
		this._log = Taro.getRealtimeLogManager ? Taro.getRealtimeLogManager() : null;
	}

	public info = (...args: Array<any>): void => {
		if (!this._log) {
			return;
		}
		this._log.info(...args);
	}

	public warn = (...args: Array<any>): void => {
		if (!this._log) {
			return;
		}
		this._log.warn(...args);
	}

	public error = (...args: Array<any>): void => {
		if (!this._log) {
			return;
		}
		this._log.error(...args);
	}

	public setFilterMsg = (msg: string): void => {
		if (!this._log || !this._log.setFilterMsg) {
			return;
		}
		this._log.setFilterMsg(msg);
	}

	public addFilterMsg = (msg: string): void => {
		if (!this._log || !this._log.addFilterMsg) {
			return;
		}
		this._log.addFilterMsg(msg);
	}
}

const logUtil = new LogUtil();
export default logUtil;
