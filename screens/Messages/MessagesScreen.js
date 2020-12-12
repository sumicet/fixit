import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from '../../components/common/Touchable';

const MessagesScreen = props => {

    return (
        <Touchable
            style={{
                flex: 0,
                backgroundColor: 'pink',
                height: 200,
                width: 300,
            }}
            onPress={() => {}}
        ></Touchable>
    );
};

const styles = StyleSheet.create({});

export default MessagesScreen;
