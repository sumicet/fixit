import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyJobsScreen = props => {
    return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>MyJobs</Text>
            </View>
    );
};

const styles = StyleSheet.create({});

export default MyJobsScreen;
