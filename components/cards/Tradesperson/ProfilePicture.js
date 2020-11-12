import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Layout from '../../../constants/Layout';

const ProfilePicture = props => {
    return (
        <View
            style={{
                height: props.isLarge ? 120 : 60,
                width: props.isLarge ? 120 : 60,
                marginRight: props.isRateCard ? 0 : Layout.generalPadding,
            }}
        >
            <Image
                style={[
                    styles.profilePicture,
                    {
                        height: props.isLarge ? 120 : 60,
                        width: props.isLarge ? 120 : 60,
                    },
                ]}
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
        borderRadius: 100,
        marginRight: Layout.generalMargin,
    },
});

export default ProfilePicture;
