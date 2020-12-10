import Taro, { RealtimeLogManager } from '@tarojs/taro';

class LogUtil {
	private log: RealtimeLogManager | null = null;

	constructor() {
		this.log = Taro.getRealtimeLogManager ? Taro.getRealtimeLogManager() : null;
	}

	public info = (...args: Array<any>): void => {
		if (!this.log) {
			return;
		}
		this.log.info(...args);
	}

	public warn = (...args: Array<any>): void => {
		if (!this.log) {
			return;
		}
		this.log.warn(...args);
	}

	public error = (...args: Array<any>): void => {
		if (!this.log) {
			return;
		}
		this.log.error(...args);
	}

	public setFilterMsg = (msg: string): void => {
		if (!this.log || !this.log.setFilterMsg) {
			return;
		}
		this.log.setFilterMsg(msg);
	}

	public addFilterMsg = (msg: string): void => {
		if (!this.log || !this.log.addFilterMsg) {
			return;
		}
		this.log.addFilterMsg(msg);
	}
}

export default new LogUtil();
