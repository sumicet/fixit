import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Touchable from './Touchable';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const CloseButton = (props) => {
    return (
        <Touchable {...props}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Icon
                    name="close"
                    size={Layout.mediumButtonIconSize}
                    color={Color.textOnTertiaryColorBackground}
                />
            </View>
        </Touchable>
    );
};

const styles = StyleSheet.create({
    
})

export default CloseButton;