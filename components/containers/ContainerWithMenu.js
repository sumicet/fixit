import React from 'react';
import { View } from 'react-native';
import BottomMenu from '../Menu/BottomMenu';

const ContainerWithMenu = props => {
    return (
        <View style={{ flex: 1 }}>
            {props.children}
            <BottomMenu navigation={props.navigation} />
        </View>
    );
};

export default ContainerWithMenu;
