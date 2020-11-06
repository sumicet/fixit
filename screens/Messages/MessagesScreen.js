import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ContainerWithMenu from '../../components/containers/ContainerWithMenu';

const MessagesScreen = props => {
    return (
        <ContainerWithMenu navigation={props.navigation} screen={3}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Messages</Text>
            </View>
        </ContainerWithMenu>
    );
};

const styles = StyleSheet.create({});

export default MessagesScreen;
