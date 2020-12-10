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
}