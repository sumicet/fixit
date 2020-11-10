import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Color from '../../constants/Color';

import Layout from '../../constants/Layout';
import Header from '../text/Header';

const TradespersonCard = props => {
    return (
        <View style={[styles.container, props.style]}>
            <Image
                style={styles.profilePicture}
                source={{
                    uri: 'https://onegov.nsw.gov.au/New/persistent/launchpad_images/contractors_Tradespersons.jpg',
                }}
                resizeMethod='scale'
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 120, //flex 0
        padding: Layout.generalPadding,
        borderRadius: Layout.borderRadius,
        borderColor: Color.secondaryColor,
        borderWidth: Layout.borderWidth,
        marginVertical: Layout.cardMargin,
        backgroundColor: 'pink',
    },
    iconContainer: {
        paddingBottom: Layout.generalPadding,
    },
    profilePicture: {
        height: 60,
        width: 60,
        borderRadius: 100
    }
});

export default TradespersonCard;
