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
import Title from '../text/Title';
import Line from '../common/Line';

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
                props.closeModal();
            }}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <Line
                        style={{ paddingTop: Layout.screenHorizontalPadding }}
                    >
                        <Title style={{ color: Color.primaryBrandColor }}>
                            John McCormack
                        </Title>
                    </Line>
                    <Line>
                        <ProfilePicture isRateCard={true} isLarge={true} />
                    </Line>
                    <Line>
                        <Occupations
                            isRateCard={true}
                            style={{ justifyContent: 'center' }}
                            textColor={Color.textOnTertiaryColorBackground}
                        />
                    </Line>
                    <Line>
                        <Rating
                            rating={props.updatedRating}
                            isRateCard={true}
                            isBeingRated={true}
                            onStarPress={handleStarPress}
                        />
                    </Line>

                    <Line
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <CloseButton onPress={handleCloseButtonPress} />
                        <OkButton onPress={handleOkButtonPress} />
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
        height: 400,
        width: 350,
        elevation: 5,
        backgroundColor: Color.tertiaryBrandColor,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: Layout.generalMargin,
    },
});

export default RateTradespersonModal;
