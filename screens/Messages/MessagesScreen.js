import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import Color from '../../constants/Color';

const MessagesScreen = props => {
    return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Messages</Text>
            </View>
    );
};

const styles = StyleSheet.create({});

export default MessagesScreen;
