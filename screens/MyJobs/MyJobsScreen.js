import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ContainerWithMenu from '../../components/containers/ContainerWithMenu';

const MyJobsScreen = props => {
    return (
        <ContainerWithMenu navigation={props.navigation} screen={2}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>MyJobs</Text>
            </View>
        </ContainerWithMenu>
    );
};

const styles = StyleSheet.create({});

export default MyJobsScreen;
