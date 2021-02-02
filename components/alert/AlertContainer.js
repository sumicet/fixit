import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

import Layout from '../../constants/Layout';

const AlertContainer = props => {
    return (
        <Modal
            {...props}
            isVisible={props.modalVisible}
            style={styles.modal}
            coverScreen={false}
            hideModalContentWhileAnimating={true}
            backdropOpacity={0}
            useNativeDriver={true}
            statusBarTranslucent
        >
            <View style={[styles.container, props.containerStyle]}>
                <View style={[styles.card, props.cardStyle]}>
                    {props.children}
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        borderRadius: Layout.borderRadius,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        justifyContent: 'flex-start',
        flex: 1,
        padding: Layout.screenHorizontalPadding,
    },
});

export default AlertContainer;
