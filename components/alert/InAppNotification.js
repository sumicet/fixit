import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SUCCESS } from '../../constants/Actions';

import Color from '../../constants/Color';
import { setInAppNotificationVisible } from '../../store/actions/ui';
import Line from '../common/Line';
import Header from '../text/Header';
import SmallContent from '../text/SmallContent';
import AlertContainer from './AlertContainer';

const InAppNotification = props => {
    const dispatch = useDispatch();
    const data = {
        title: useSelector(state => state.ui.title),
        message: useSelector(state => state.ui.message),
        inAppNotificationVisible: useSelector(
            state => state.ui.inAppNotificationVisible
        ),
        style: useSelector(state => state.ui.style),
    };

    return (
        <AlertContainer
            animationIn="bounceInDown"
            animationOut="bounceOutUp"
            animationInTiming={1000}
            animationOutTiming={300}
            swipeDirection={['left', 'right']}
            onSwipeComplete={() => {
                dispatch(setInAppNotificationVisible(false));
            }}
            swipeThreshold={50}
            propagateSwipe={true}
            modalVisible={data.inAppNotificationVisible}
            hasBackdrop={false}
            cardStyle={{
                height: 70,
                width: '100%',
                backgroundColor: data.style === SUCCESS ? Color.primaryBrandColor : Color.error,
            }}
        >
            <Line
                style={{
                    paddingBottom: 5,
                    flex: 0,
                }}
            >
                <Header
                    style={{
                        color: Color.importantTextOnTertiaryColorBackground,
                        textAlignVertical: 'center',
                    }}
                >
                    {data.title}
                </Header>
            </Line>
            <Line
                style={{
                    paddingBottom: 0,
                    flex: 0,
                }}
            >
                <SmallContent
                    style={{
                        color: Color.importantTextOnTertiaryColorBackground,
                        fontFamily: 'Asap-Regular',
                    }}
                >
                    {data.message}
                </SmallContent>
            </Line>
        </AlertContainer>
    );
};
export default InAppNotification;
