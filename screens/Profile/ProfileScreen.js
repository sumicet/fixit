import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = props => {
    return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>Profile</Text>
            </View>
    );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
