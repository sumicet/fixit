import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ContainerWithMenu from '../../components/containers/ContainerWithMenu';

const ProfileScreen = props => {
    return (
        <ContainerWithMenu navigation={props.navigation} screen={4}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Profile</Text>
            </View>
        </ContainerWithMenu>
    );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
