import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ContainerWithMenu from '../../components/containers/ContainerWithMenu';

const HomeScreen = props => {
    return (
        <ContainerWithMenu navigation={props.navigation} screen={1}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Home</Text>
            </View>
        </ContainerWithMenu>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
