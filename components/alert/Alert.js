import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import Color from '../../constants/Color';
import Line from '../common/Line';
import Title from '../text/Title';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import Header from '../text/Header';

const Alert = props => {
    return (
        <Modal
            animationType="slide"
            transparent
            visible={props.modalVisible}
            presentationStyle="overFullScreen"
            onRequestClose={() => {
                props.onHideModal();
            }}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <Line
                        style={{ paddingTop: Layout.screenHorizontalPadding }}
                    >
                        <Title style={{ color: Color.primaryBrandColor }}>
                            {props.title}
                        </Title>
                    </Line>
                    <Line>
                        <Header style={{ color: Color.primaryColor, fontFamily: 'asap-regular' }}>
                            {props.message}
                        </Header>
                    </Line>
                    <Line
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            width: '100%',
                            paddingBottom: Layout.screenHorizontalPadding
                        }}
                    >
                        <Touchable
                            onPress={props.onCancel}
                            style={[
                                styles.touchable,
                                { backgroundColor: Color.primaryBrandColor },
                            ]}
                        >
                            <Header style={{color: Color.primaryColor, fontFamily: 'asap-regular'}}>Go back</Header>
                        </Touchable>
                        <Touchable
                            onPress={props.onPress}
                            style={[
                                styles.touchable,
                                { backgroundColor: Color.urgent },
                            ]}
                        >
                            <Header style={{color: Color.primaryColor, fontFamily: 'asap-regular'}}>Yes</Header>
                        </Touchable>
                    </Line>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderRadius: Layout.borderRadius,
        height: 250,
        width: 350,
        elevation: 5,
        backgroundColor: Color.tertiaryBrandColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Layout.generalMargin,
    },
    touchable: {
        flex: 0,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Layout.generalPadding,
        borderRadius: Layout.borderRadius,
    },
});

export default Alert;
