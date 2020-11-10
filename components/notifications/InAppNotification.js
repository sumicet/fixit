
import { showMessage, hideMessage } from 'react-native-flash-message';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

export const showInAppNotification = (message, description, onPress, backgroundColor) => {
    showMessage({
        message: message,
        description: description,
        onPress: onPress,
        backgroundColor: backgroundColor,
        titleStyle: {
            fontFamily: 'asap-semibold',
            fontSize: Layout.contentSize,
            color: Color.textColor,
        },
        textStyle: {
            fontFamily: 'asap-regular',
            fontSize: Layout.smallContentSize,
            color: Color.textColor,
        },
        type: 'default',
        color: Color.textColor,
        duration: 7000,
        floating: true,
        style: {
            borderRadius: Layout.borderRadius,
        },
    });
}