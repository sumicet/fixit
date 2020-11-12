import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, Modal } from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Rating from '../cards/Tradesperson/Rating';
import HeaderWithEllipsis from '../text/HeaderWithEllipsis';
import OkButton from '../common/OkButton';
import CloseButton from '../common/CloseButton';
import ProfilePicture from '../cards/Tradesperson/ProfilePicture';
import Occupations from '../cards/Tradesperson/Occupations';

const RateTradespersonModal = props => {
    const handleStarPress = value => {
        props.setUpdatedRating(value);
    };

    const handleCloseButtonPress = () => {
        props.closeModal();
        props.setUpdatedRating(0);
    };

    const handleOkButtonPress = () => {
        props.closeModal();
        props.setUpdatedRating(0); // TODO delete the card instead of setting it to 0
    };

    return (
        <Modal
            animationType="slide"
            transparent
            visible={props.modalVisible}
            presentationStyle="overFullScreen"
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={{ flex: 0 }}>
                        <ProfilePicture isRateCard={true} />
                    </View>
                    <View style={{ flex: 0 }}>
                        <View style={{ alignItems: 'center' }}>
                            <HeaderWithEllipsis
                                style={{ color: Color.primaryColor }}
                            >
                                John McCormack
                            </HeaderWithEllipsis>
                        </View>
                        <Occupations
                            isRateCard={true}
                            style={{ justifyContent: 'center' }}
                            textColor={Color.smallTextOnStarColorBackground}
                        />
                    </View>
                    <Rating
                        rating={props.updatedRating}
                        isRateCard={true}
                        isBeingRated={true}
                        onStarPress={handleStarPress}
                    />
                    <View
                        style={{
                            flex: 0,
                            width: '100%',
                            height: Layout.mediumButtonIconSize,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <CloseButton onPress={handleCloseButtonPress} />
                        <OkButton onPress={handleOkButtonPress} />
                    </View>
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
        height: 300,
        width: 300,
        elevation: 5,
        backgroundColor: Color.starColor,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: Layout.generalMargin,
    },
});

export default RateTradespersonModal;
