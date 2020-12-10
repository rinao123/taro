import Taro from '@tarojs/taro';
import { Color } from '../common/defines';

export default class CommonUtil {
    public static showFail = (content: string): void => {
        Taro.showModal({
            title: '提示',
            content: content,
            showCancel: false,
            confirmColor: Color.mainColor
        });
    }

    public static showModal = (title: string, content: string, showCancel: boolean): Promise<Taro.showModal.SuccessCallbackResult> => {
        return Taro.showModal({
            title: title,
            content: content,
            showCancel: showCancel,
            confirmColor: Color.mainColor
        });
    }

    public static sleep = (milliseconds: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      }

    public static retry = async (promiseGenerator: () => Promise<any>, times: number = 3, interval: number = 1000): Promise<any> => {
        const doRetry = async () => {
          try {
            const data = await promiseGenerator();
            return data;
          } catch (error) {
            times--;
            if (times === 0) {
              return Promise.reject(error);
            }
            await CommonUtil.sleep(interval);
            const data = await doRetry();
            return data;
          }
        }
        try {
          const data = await doRetry();
          return data;
        } catch (error) {
          return Promise.reject(error);
        }
      }
}