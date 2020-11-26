import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Layout from '../../../constants/Layout';

const ProfilePicture = props => {
    return (
        <View
            style={{
                height: props.isLarge ? 80 : 60,
                width: props.isLarge ? 80 : 60,
                marginRight: props.isRateCard ? 0 : Layout.generalPadding,
            }}
        >
            <Image
                style={[
                    styles.profilePicture,
                    {
                        height: props.isLarge ? 80 : 60,
                        width: props.isLarge ? 80 : 60,
                    },
                ]}
                source={{
                    uri:
                        'https://www.phamnews.co.uk/web-cont1001/uploads/image002-4.jpg',
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
