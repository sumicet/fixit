import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
