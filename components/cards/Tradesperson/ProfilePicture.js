import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../../constants/Color';

import Layout from '../../../constants/Layout';

const ProfilePicture = props => {
    return (
        <View
            style={{
                height: props.isLarge ? 80 : 50,
                width: props.isLarge ? 80 : 50,
                marginRight: props.isRateCard ? 0 : Layout.generalPadding,
            }}
        >
            {props.profilePicture ? (
                <Image
                    style={[
                        styles.profilePicture,
                        {
                            height: props.isLarge ? 80 : 50,
                            width: props.isLarge ? 80 : 50,
                        },
                    ]}
                    source={{
                        uri: props.profilePicture,
                    }}
                    resizeMethod="scale"
                />
            ) : (
                <View
                    style={[
                        styles.profilePicture,
                        {
                            backgroundColor: Color.textColor,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}
                >
                    <Icon
                        name="user"
                        size={props.isLarge ? 60 : 30}
                        color={Color.importantTextOnTertiaryColorBackground}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    profilePicture: {
        borderRadius: 100,
        //marginRight: Layout.generalMargin,
    },
});

export default ProfilePicture;
