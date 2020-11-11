import React from 'react';
import { StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

const Touchable = props => {
    return (
        <TouchableScale
            {...props}
            activeScale={0.8}
            style={[{ flex: 1 }, props.style]}
            pressInTension={1000}
            pressOutTension={1000}
            pressInFriction={100}
            pressOutFriction={100}
        >
            {props.children}
        </TouchableScale>
    );
};

const styles = StyleSheet.create({});

export default Touchable;
