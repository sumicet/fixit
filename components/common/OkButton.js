import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Touchable from './Touchable';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const OkButton = (props) => {
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
                    name="check"
                    size={Layout.mediumButtonIconSize}
                    color={Color.primaryBrandColor}
                />
            </View>
        </Touchable>
    );
};

const styles = StyleSheet.create({
    
})

export default OkButton;