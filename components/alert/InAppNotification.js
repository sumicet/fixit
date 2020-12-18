import React from 'react';
import { StyleSheet } from 'react-native';

import Color from '../../constants/Color';
import Line from '../common/Line';
import Header from '../text/Header';
import SmallContent from '../text/SmallContent';
import AlertContainer from './AlertContainer';

const InAppNotification = props => {
    return (
        <AlertContainer
            animationIn="bounceInDown"
            animationOut="bounceOutUp"
            animationInTiming={1000}
            animationOutTiming={300}
            swipeDirection={['left', 'right']}
            onSwipeComplete={props.hide}
            swipeThreshold={50}
            propagateSwipe={true}
            modalVisible={props.inAppNotificationVisible}
            cardStyle={styles.card}
        >
            <Line
                style={{
                    paddingBottom: 5,
                    flex: 0,
                }}
            >
                <Header
                    style={{
                        color: Color.primaryColor,
                        textAlignVertical: 'center',
                    }}
                >
                    {props.title}
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
                        color: Color.primaryColor,
                        fontFamily: 'Asap-Regular',
                    }}
                >
                    {props.message}
                </SmallContent>
            </Line>
        </AlertContainer>
    );
};
const styles = StyleSheet.create({
    card: {
        height: 70,
        width: '100%',
        backgroundColor: Color.primaryBrandColor,
    },
});

export default InAppNotification;
