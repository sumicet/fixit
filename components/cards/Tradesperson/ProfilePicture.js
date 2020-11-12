import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Layout from '../../../constants/Layout';

const ProfilePicture = props => {
    return (
        <View
            style={{
                height: 60,
                width: 60,
                marginRight: props.isRateCard ? 0 : Layout.generalPadding,
            }}
        >
            <Image
                style={styles.profilePicture}
                source={{
                    uri:
                        'https://onegov.nsw.gov.au/New/persistent/launchpad_images/contractors_Tradespersons.jpg',
                }}
                resizeMethod="scale"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    profilePicture: {
        height: 60,
        width: 60,
        borderRadius: 100,
        marginRight: Layout.generalMargin,
    },
});

export default ProfilePicture;
